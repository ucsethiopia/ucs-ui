# UCS Service API

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET  | `/health` | Health check (Postgres) |
| POST | `/contact` | Submit contact form (audit + email) |
| POST | `/contact/test/sandbox` | Send test email via Mailgun sandbox domain |
| POST | `/contact/test/domain` | Send test email via Mailgun custom domain (mg.ucsethiopia.com) |
| GET  | `/news/latest` | Latest 9 news items |
| GET  | `/news` | Paginated news list |
| GET  | `/team` | List all team members |
| GET  | `/team/{name}` | Team member detail by slug |

---

## GET /health

**Success**
```json
{
  "status": "healthy",
  "database": "ok"
}
```

**Unhealthy**
```json
{
  "status": "unhealthy",
  "database": "connection refused"
}
```

---

## POST /contact

Submit the contact form. Request is persisted to Postgres for audit; a notification email is sent to configured recipients (From: fixed address, Reply-To: submitter).

**Request body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| fullname | string | Yes | Full name |
| email | string (email) | Yes | Email address |
| subject | string | Yes | Subject line |
| phone | string | No | Phone number |
| company | string | No | Company name |
| service | string | No | Service of interest |
| message | string | No | Message body |

**Example request**
```json
{
  "fullname": "Abebe Kebede",
  "email": "abebe@example.com",
  "subject": "Partnership inquiry",
  "phone": "+251911000000",
  "company": "Acme PLC",
  "service": "Consulting",
  "message": "We would like to discuss a partnership."
}
```

**Success (201)** – Submission saved and notification email sent.
```json
{
  "message": "Thank you. Your message has been received."
}
```

**Notification email failed (503)** – Submission was saved to the database, but sending the notification email failed (e.g. SMTP not configured or unreachable). Response body includes a `detail` message.
```json
{
  "detail": "Your message has been saved. We could not send a notification email; we will follow up shortly."
}
```

**Validation error (422)**  
Body with field errors (e.g. missing required field, invalid email).

---

## POST /contact/test/sandbox

Sends a test email via **Mailgun sandbox** domain. No request body. Requires `MAILGUN_API_KEY`. Use this to verify Mailgun without a verified custom domain.

**Success (200)**
```json
{
  "message": "Test email sent via Mailgun sandbox."
}
```

**Failure (503)** – e.g. API key not set or Mailgun error.
```json
{
  "detail": "MAILGUN_API_KEY is not set."
}
```

---

## POST /contact/test/domain

Sends a test email via **Mailgun custom domain** (`mg.ucsethiopia.com`). No request body. Requires `MAILGUN_API_KEY` and the domain to be verified in Mailgun.

**Success (200)**
```json
{
  "message": "Test email sent via Mailgun custom domain."
}
```

**Failure (503)** – e.g. API key not set, domain not verified, or Mailgun error.

---

## GET /news/latest

Returns the 9 most recent news items, ordered by date descending.

**Response**
```json
{
  "items": [
    {
      "id": 1,
      "title": "UCS launches new training program",
      "subtitle": "Short summary.",
      "date": "2025-02-08",
      "tags": ["consulting", "training"],
      "team": "UCS Team",
      "news": "Full body text...",
      "main_image": "https://...",
      "images": ["https://...", "https://..."]
    }
  ]
}
```

---

## GET /news

Paginated news list.

**Query parameters**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | int | 1 | Page number (≥ 1) |
| per_page | int | 9 | Items per page (1–50) |

**Example:** `GET /news?page=2&per_page=9`

**Response**
```json
{
  "items": [
    {
      "id": 10,
      "title": "Older news title",
      "subtitle": null,
      "date": "2025-01-28",
      "tags": [],
      "team": null,
      "news": "Body...",
      "main_image": null,
      "images": []
    }
  ],
  "total": 18,
  "page": 2,
  "per_page": 9
}
```

---

## GET /team

List all team members (from `data/team/*.json`).

**Response**
```json
[
  {
    "name": "Jane Doe",
    "titles": ["Dr.", "PhD"],
    "role": "Managing Director",
    "years_of_experience": 15,
    "image": "https://...",
    "summary": "Experienced leader in consulting..."
  }
]
```

---

## GET /team/{name}

Full detail for one team member. `{name}` is a slug (e.g. `jane-doe`) matching the filename stem or the normalized `name` field.

**Response**
```json
{
  "name": "Jane Doe (PhD)",
  "titles": [
    "Assistant Professor of Management"
  ],
  "role": "Managing Director",
  "years_of_experience": 15,
  "image": "https://...",
  "contact": {
    "email": "sample@ucsethiopia.com",
    "phone": "+251 11 123 4567",
    "linkedin": "https://linkedin.com/in/sample-member"
  },
  "summary": "Experienced leader in consulting.....",
  "education": {
    "bachelors": [
      {
        "degree_title": "Bachelor of Arts in Economics",
        "university": "Addis Ababa University",
        "location": "Addis Ababa, Ethiopia",
        "start_year": 2005,
        "end_year": 2009
      }
    ],
    "masters": [],
    "phd": [],
    "other": []
  },
  "experiences": [
    {
      "type": "job",
      "data": {
        "position_title": "Managing Director",
        "company": "UCS Ethiopia",
        "location": "Addis Ababa, Ethiopia",
        "start_date": "2015-01",
        "end_date": "2025-02",
        "summary_points": ["Led strategic planning..."]
      }
    },
    {
      "type": "training_given",
      "data": {
        "training_titles": ["Leadership Training", "AI Bootcamp"]
      }
    }
  ],
  "grants_awards": [
    { "description": "Awarded XYZ fellowship", "year": 2024 }
  ],
  "trainings_taken": {
    "local": ["Project Management"],
    "international": ["Harvard Executive Education"]
  },
  "leadership_programs": [
    { "title": "Young African Leaders Initiative", "description": "..." }
  ],
  "technical_skills": [
    { "category": "Programming Languages", "skills": ["Python", "Java"] }
  ],
  "projects": {
    "research": [
      {
        "title": "Impact of FDI on Ethiopian Manufacturing",
        "authors": ["Jane Doe", "Co-Author B"],
        "description": "Short summary."
      }
    ],
    "software": [
      {
        "title": "UCS Data Dashboard",
        "links": [{ "title": "GitHub", "url": "https://..." }],
        "tech_stack": ["FastAPI", "Postgres", "React"],
        "descriptions": ["Bullet point 1", "Bullet point 2"]
      }
    ]
  }
}
```

**404** – No team member found for the given slug.
