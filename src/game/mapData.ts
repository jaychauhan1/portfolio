export const TILE = 16
export const MAP_WIDTH = 48
export const MAP_HEIGHT = 36

/** Tile indices in the tileset texture */
export const TILES = {
  asphalt: 0,
  sidewalk: 1,
  agoraFloor: 2,
  grass: 3,
  court: 4,
  rooftop: 5,
} as const

/** 0 = walkable ground, 1 = blocked */
export type MapCell = number

export interface ZoneDef {
  id: string
  label: string
  section: 'about' | 'contact' | 'education' | 'experience' | 'projects' | 'skills'
  x: number
  y: number
  width: number
  height: number
  experienceIndex?: number
}

export function buildGroundLayer(): number[][] {
  const map: number[][] = Array.from({ length: MAP_HEIGHT }, () =>
    Array(MAP_WIDTH).fill(TILES.asphalt),
  )

  // Sidewalk grid
  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      if (x % 8 === 0 || y % 8 === 0) map[y][x] = TILES.sidewalk
    }
  }

  // Agora coffee shop interior (spawn area)
  for (let y = 14; y <= 20; y++) {
    for (let x = 10; x <= 18; x++) {
      map[y][x] = TILES.agoraFloor
    }
  }

  // Agora patio
  for (let y = 21; y <= 23; y++) {
    for (let x = 10; x <= 20; x++) {
      map[y][x] = TILES.sidewalk
    }
  }

  // UH campus green (north)
  for (let y = 4; y <= 10; y++) {
    for (let x = 28; x <= 42; x++) {
      map[y][x] = TILES.grass
    }
  }

  // Basketball court (hidden west alley)
  for (let y = 16; y <= 22; y++) {
    for (let x = 2; x <= 7; x++) {
      map[y][x] = TILES.court
    }
  }

  // Rooftop platform (northwest)
  for (let y = 6; y <= 9; y++) {
    for (let x = 4; x <= 9; x++) {
      map[y][x] = TILES.rooftop
    }
  }

  // Project lab area
  for (let y = 28; y <= 32; y++) {
    for (let x = 30; x <= 38; x++) {
      map[y][x] = TILES.sidewalk
    }
  }

  return map
}

export function buildCollisionLayer(): MapCell[][] {
  const collision: MapCell[][] = Array.from({ length: MAP_HEIGHT }, () =>
    Array(MAP_WIDTH).fill(0),
  )

  const buildings: Array<[number, number, number, number]> = [
    [8, 12, 12, 2], // agora north wall
    [20, 14, 2, 10], // agora east wall
    [8, 22, 14, 2], // agora south wall
    [8, 14, 1, 4], // agora west wall top
    [8, 20, 1, 2], // agora west wall bottom (door at y=18-19)
    [24, 8, 4, 6], // campus building
    [32, 6, 6, 8], // cougarCS
    [36, 14, 5, 8], // lyondell
    [36, 24, 5, 8], // research
    [44, 14, 3, 8], // tcs
    [28, 26, 8, 4], // project lab
    [1, 14, 1, 10], // court west wall
    [3, 4, 6, 2], // rooftop access building
  ]

  for (const [bx, by, bw, bh] of buildings) {
    for (let y = by; y < by + bh; y++) {
      for (let x = bx; x < bx + bw; x++) {
        if (y >= 0 && y < MAP_HEIGHT && x >= 0 && x < MAP_WIDTH) {
          collision[y][x] = 1
        }
      }
    }
  }

  // Door gap in agora west wall — walk west to basketball court
  for (let y = 18; y <= 19; y++) {
    for (let x = 7; x <= 9; x++) {
      if (y >= 0 && y < MAP_HEIGHT && x >= 0 && x < MAP_WIDTH) {
        collision[y][x] = 0
      }
    }
  }

  return collision
}

export const ZONES: ZoneDef[] = [
  {
    id: 'agora',
    label: 'Agora Coffee',
    section: 'contact',
    x: 10 * TILE,
    y: 14 * TILE,
    width: 9 * TILE,
    height: 7 * TILE,
  },
  {
    id: 'campus',
    label: 'UH Campus',
    section: 'education',
    x: 28 * TILE,
    y: 4 * TILE,
    width: 14 * TILE,
    height: 8 * TILE,
  },
  {
    id: 'lyondell',
    label: 'LyondellBasell',
    section: 'experience',
    x: 36 * TILE,
    y: 14 * TILE,
    width: 5 * TILE,
    height: 8 * TILE,
    experienceIndex: 0,
  },
  {
    id: 'research',
    label: 'Research Lab',
    section: 'experience',
    x: 36 * TILE,
    y: 24 * TILE,
    width: 5 * TILE,
    height: 8 * TILE,
    experienceIndex: 1,
  },
  {
    id: 'tcs',
    label: 'TCS Tower',
    section: 'experience',
    x: 43 * TILE,
    y: 14 * TILE,
    width: 4 * TILE,
    height: 8 * TILE,
    experienceIndex: 2,
  },
  {
    id: 'project_lab',
    label: 'Project Lab',
    section: 'projects',
    x: 28 * TILE,
    y: 26 * TILE,
    width: 10 * TILE,
    height: 7 * TILE,
  },
  {
    id: 'rooftop',
    label: 'Rooftop Lookout',
    section: 'about',
    x: 4 * TILE,
    y: 6 * TILE,
    width: 6 * TILE,
    height: 4 * TILE,
  },
  {
    id: 'court',
    label: 'Basketball Court',
    section: 'skills',
    x: 2 * TILE,
    y: 16 * TILE,
    width: 6 * TILE,
    height: 7 * TILE,
  },
]

export const SPAWN = { x: 14 * TILE + 8, y: 18 * TILE + 8 }
