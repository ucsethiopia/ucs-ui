   git clone <repository-url>
   cd ucs-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

### Development

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

Build the application for production:

```bash
npm run build
# or
pnpm build
```

### Run Production

Start the production server:

```bash
npm run start
# or
pnpm start
```

## Project Structure

```
ucs-ui/
├── app/                  # Next.js application pages
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   └── ...
├── components/           # Reusable UI components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── home/             # Home page specific components
│   ├── ui/               # General UI primitives (Button, Card, etc.)
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and constants
├── public/               # Static assets
└── styles/               # Global styles and Tailwind config
