# Market Data API

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check (Redis, MongoDB) |
| GET | `/fx/latest` | Current ETB rates vs USD, EUR, AUD, GBP, JPY, CNY (price + direction) |
| GET | `/fx/historical?from_date=&to_date=&currency=` | Historical FX (date range) |
| GET | `/commodities/latest` | Coffee, gold, silver (price + direction) |
| GET | `/commodities/historical?from_date=&to_date=&symbol=` | Historical commodities |
| GET | `/interest` | NBE policy rate, T-Bill yield |
| GET | `/gdp` | Latest GDP value, year |

## Query Parameters

- **fx/historical**: `from_date` (YYYY-MM-DD), `to_date` (YYYY-MM-DD), `currency` (optional: USD, EUR, etc)
- **commodities/historical**: `from_date`, `to_date`, `symbol` (optional: XAU/USD, XAG/USD, KC1)


## Response Structure

All endpoints return JSON. See response samples below for React UI integration.

### GET /health

**Success**
```json
{
  "status": "healthy",
  "redis": "ok",
  "mongodb": "ok"
}
```

**Unhealthy** (Redis or MongoDB unreachable)
```json
{
  "status": "unhealthy",
  "redis": "Connection refused"
}
```

---

### GET /fx/latest

**Success**
```json
{
  "rates": {
    "USD": {
      "rate": 0.0178,
      "direction": "increased",
      "updated_at": "2025-01-31T12:00:00.000000"
    },
    "EUR": {
      "rate": 0.0164,
      "direction": "decreased",
      "updated_at": "2025-01-31T12:00:00.000000"
    },
    "AUD": {
      "rate": 0.0272,
      "direction": "unchanged",
      "updated_at": "2025-01-31T12:00:00.000000"
    },
    "GBP": { "rate": 0.0141, "direction": "increased", "updated_at": "2025-01-31T12:00:00.000000" },
    "JPY": { "rate": 2.65, "direction": "decreased", "updated_at": "2025-01-31T12:00:00.000000" },
    "CNY": { "rate": 0.128, "direction": "unchanged", "updated_at": "2025-01-31T12:00:00.000000" }
  },
  "base": "ETB"
}
```

**Empty** (no data yet)
```json
{
  "rates": {},
  "base": "ETB",
  "message": "No data yet"
}
```

`direction` is one of: `"increased"` | `"decreased"` | `"unchanged"`

---

### GET /fx/historical?from_date=2025-01-01&to_date=2025-01-31&currency=USD

**Success**
```json
{
  "data": [
    {
      "date": "2025-01-01",
      "rates": { "USD": 0.0175 },
      "source": "fxratesapi"
    },
    {
      "date": "2025-01-02",
      "rates": { "USD": 0.0176 },
      "source": "fxratesapi"
    }
  ],
  "count": 2
}
```

Omit `currency` to get all currencies in each record. `rates` keys: USD, EUR, AUD, GBP, JPY, CNY.

---

### GET /commodities/latest

**Success**
```json
{
  "commodities": {
    "XAU/USD": {
      "price": 2650.50,
      "direction": "increased",
      "symbol": "XAU/USD",
      "updated_at": "2025-01-31T12:00:00.000000"
    },
    "XAG/USD": {
      "price": 31.25,
      "direction": "decreased",
      "symbol": "XAG/USD",
      "updated_at": "2025-01-31T12:00:00.000000"
    },
    "KC1": {
      "price": 2.18,
      "direction": "unchanged",
      "symbol": "KC1",
      "updated_at": "2025-01-31T12:00:00.000000"
    }
  }
}
```

**Empty**
```json
{
  "commodities": {},
  "message": "No data yet"
}
```

`direction` is one of: `"increased"` | `"decreased"` | `"unchanged"`

---

### GET /commodities/historical?from_date=2025-01-01&to_date=2025-01-31&symbol=XAU/USD

**Success**
```json
{
  "data": [
    {
      "date": "2025-01-01",
      "symbol": "XAU/USD",
      "open": 2640.0,
      "high": 2655.0,
      "low": 2635.0,
      "close": 2650.5
    }
  ],
  "count": 1
}
```

Omit `symbol` to get all commodities. Valid symbols: `XAU/USD`, `XAG/USD`, `KC1`.

---

### GET /interest

**Success**
```json
{
  "policy_rate": 15.0,
  "tbill_yield": 14.628,
  "updated_at": "2025-01-31T06:00:00.000000"
}
```

**Empty**
```json
{
  "message": "No data yet",
  "policy_rate": 0,
  "tbill_yield": 0
}
```

---

### GET /gdp

**Success**
```json
{
  "value": 160.5,
  "year": "2024",
  "updated_at": "2025-01-15T07:00:00.000000"
}
```

**Empty**
```json
{
  "message": "No data yet",
  "value": 0,
  "year": ""
}
```

`value` is in billions (e.g., 160.5 = 160.5 billion USD).


