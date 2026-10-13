# Poodle Ride Adventure: Rasta-Manor Archway & Transition Listing

This listing documents the core archways and transitions implemented in the Rasta-Manor, organized by area and coordinate alignment. Using subfolders helps maintain code integrity and modularity.

## 1. Foyer Archways
Located in `src/Level_0/Rasta-Manor/Transitions/Handlers/F/Archways/`

### North: The Front Door
- **Coordinates**: `nextY >= dims.height`, `nextX` centered (`987-1013`)
- **Level**: Floor only.
- **Leads to**: Front Porch.
- **Transitions**: 7-bark polished entry.

### South: Rugged Play Field Archway (Green and Gold Stripes)
- **Coordinates**: `nextY <= 1`, `nextX` centered (`987-1013`)
- **Level**: Floor only.
- **Leads to**: Rugged Play Field.
- **Transitions**: 8-bark polished entry.

### West: Grand Indoor Playground Access
- **NW Archway**: `y1980-2000`. Leads to Playground floor. (Floor level).
- **Floor Archway**: `y410-430`. Leads to Playground floor. (Floor level).
- **Sky Perimeter Archway**: `y1320-1340`. Leads to Playground perimeter walkway. (Sky level).
- **Transitions**: 6-bark polished entry.

### East: Grand Ballroom Access
- **Sky Perimeter Archways**: `y1984-1994` (North) and `y1-10` (South).
- **Leads to**: Ballroom perimeter walkway. (Sky level only).
- **Transitions**: 8-bark polished entry.

### Cellar: The Double Doors
- **Coordinates**: `x1-20`, `y1315-1325`.
- **Level**: Floor.
- **Leads to**: Cellar area. (Descends via ramp logic separately).

## 2. Grand Playground Archways
Located in `src/Level_0/Rasta-Manor/Transitions/Handlers/G/Archways/`

### East: Foyer Connections
Matches the Foyer's West access points.
- **Archways**: `y1980-2000`, `y410-430`, `y1320-1340` (Sky).

## 3. Ramps & Vertical Connections
Located in `src/Level_0/Rasta-Manor/Transitions/Handlers/*/Ramps/`

### Foyer Sky Ramp
- **Range**: `x1-20`, `y1320-2000`.
- **Beeps**: Start at `y1341`, end at `y1979`.
- **Railings**: Fixed at 3.5 inches from walls/barriers (x1.29 and x19.71).

### Cellar Ramp
- **Range**: `x1-20`, `y1320-2000`.
- **Verticality**: Floor to Cellar.
