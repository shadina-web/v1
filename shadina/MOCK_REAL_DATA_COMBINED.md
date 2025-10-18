# Offers Page - Mock + Real Data Combined

## What Changed
Updated the Offers page to show **BOTH mock data AND real user profiles** together.

## Implementation
Modified `Offers.tsx` to:
1. ✅ Fetch mock worker profiles from `api.getOffers()` 
2. ✅ Fetch real workers from backend via `getAllWorkers()`
3. ✅ Transform real workers into offer format
4. ✅ Combine both lists: `[...mockOffers, ...realOffers]`
5. ✅ Apply filters to the combined list

## Result
**Offers page now displays:**
- All mock worker profiles (Rajesh Kumar, Priya Sharma, Amit Patel, Sunita Devi, Vikram Singh, etc.)
- All real workers from database (Saniya Khan and any other registered workers)
- Each worker appears once per skill they offer

## Code Changes
```typescript
// Fetch BOTH mock data AND real workers
const mockOffers = await api.getOffers(); // Get mock data
const workers = await getAllWorkers(); // Get real workers

// Transform real workers to offers
const realOffers = workers.map(worker => {
  // Create one offer per skill
});

// Combine them
const allOffers = [...mockOffers, ...realOffers];
```

## Benefits
✅ Shows realistic sample data (mock profiles)
✅ Shows actual registered users (real data)
✅ Both are searchable and filterable
✅ Smooth user experience with plenty of content
✅ Real profiles are prefixed with "real-" in ID to distinguish them

## File Modified
- `src/pages/Offers.tsx` - Combined mock and real data sources
