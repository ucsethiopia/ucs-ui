import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const workspaceRoot = process.cwd();
const mockDataPath = path.join(workspaceRoot, "lib", "mock-data.ts");
const expectedArrays = new Set(["clientLogos", "strategicPartners"]);
const fileNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(png|svg|jpg|jpeg|webp)$/;

/** @type {{arrayName: string; companyName: string; logoPath: string}[]} */
const logoEntries = [];

const sourceText = fs.readFileSync(mockDataPath, "utf8");
const sourceFile = ts.createSourceFile(
  mockDataPath,
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);

/** @param {ts.Node} node */
function visit(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
    const arrayName = node.name.text;
    if (
      expectedArrays.has(arrayName) &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(element)) continue;

        let companyName = "(unknown)";
        let logoPath = null;

        for (const property of element.properties) {
          if (!ts.isPropertyAssignment(property)) continue;
          if (!ts.isIdentifier(property.name)) continue;

          if (
            property.name.text === "name" &&
            ts.isStringLiteral(property.initializer)
          ) {
            companyName = property.initializer.text;
          }

          if (
            property.name.text === "logo" &&
            ts.isStringLiteral(property.initializer)
          ) {
            logoPath = property.initializer.text;
          }
        }

        if (logoPath) {
          logoEntries.push({ arrayName, companyName, logoPath });
        }
      }
    }
  }

  ts.forEachChild(node, visit);
}

visit(sourceFile);

const issues = [];

for (const entry of logoEntries) {
  if (!entry.logoPath.startsWith("/images/logos/")) {
    issues.push(
      `[${entry.arrayName}] ${entry.companyName}: logo path must start with /images/logos/ (got ${entry.logoPath})`,
    );
    continue;
  }

  const relativePath = entry.logoPath.replace(/^\//, "");
  const absolutePath = path.join(
    workspaceRoot,
    "public",
    relativePath.replace(/^images\//, "images/"),
  );
  const fileName = path.basename(entry.logoPath);

  if (!fileNamePattern.test(fileName)) {
    issues.push(
      `[${entry.arrayName}] ${entry.companyName}: filename must be lowercase kebab-case (got ${fileName})`,
    );
  }

  if (!fs.existsSync(absolutePath)) {
    issues.push(
      `[${entry.arrayName}] ${entry.companyName}: missing file public/${relativePath}`,
    );
  }
}

if (issues.length > 0) {
  console.error("Logo asset check failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(
  `Logo asset check passed (${logoEntries.length} logo references verified).`,
);
