import Phaser from 'phaser'

const TILE = 16

const COLORS = {
  asphalt: 0x2a2a2e,
  sidewalk: 0x3d3d42,
  building: 0x1e1e22,
  buildingAccent: 0x4a6b8a,
  agoraWarm: 0xc4a882,
  agoraGlow: 0xf5d4a0,
  panelCream: 0xf5f0e8,
  grass: 0x2d3a2d,
  court: 0x8b4513,
  courtLine: 0xf5f0e8,
  roof: 0x3a3a40,
  window: 0xf5e6c8,
  windowDim: 0x4a6b8a,
  playerCoat: 0x2c2c2c,
  playerSkin: 0xd4a574,
  playerPants: 0x1a1a1a,
}

function fillRect(
  g: Phaser.GameObjects.Graphics,
  x: number,
  y: number,
  w: number,
  h: number,
  color: number,
) {
  g.fillStyle(color, 1)
  g.fillRect(x, y, w, h)
}

export function generateTextures(scene: Phaser.Scene) {
  generateTileset(scene)
  generatePlayerSprites(scene)
  generateBuildingDecor(scene)
  generateZoneMarker(scene)
}

function generateTileset(scene: Phaser.Scene) {
  const g = scene.make.graphics({ x: 0, y: 0 })

  // 0: asphalt
  fillRect(g, 0, 0, TILE, TILE, COLORS.asphalt)
  g.fillStyle(0x333338, 0.4)
  g.fillRect(2, 7, 4, 1)
  g.fillRect(10, 3, 3, 1)

  // 1: sidewalk
  fillRect(g, TILE, 0, TILE, TILE, COLORS.sidewalk)
  g.lineStyle(1, 0x555560, 0.5)
  g.strokeRect(TILE + 1, 1, TILE - 2, TILE - 2)

  // 2: agora floor (warm wood)
  fillRect(g, TILE * 2, 0, TILE, TILE, 0x3d2e22)
  g.fillStyle(COLORS.agoraWarm, 0.3)
  g.fillRect(TILE * 2 + 2, 2, TILE - 4, 1)

  // 3: grass
  fillRect(g, TILE * 3, 0, TILE, TILE, COLORS.grass)
  g.fillStyle(0x3d4f3d, 0.6)
  g.fillRect(TILE * 3 + 4, 4, 2, 2)

  // 4: court
  fillRect(g, TILE * 4, 0, TILE, TILE, COLORS.court)
  g.fillStyle(COLORS.courtLine, 0.15)
  g.fillRect(TILE * 4 + 7, 0, 2, TILE)

  // 5: rooftop
  fillRect(g, TILE * 5, 0, TILE, TILE, COLORS.roof)
  g.fillStyle(0x555560, 0.5)
  g.fillRect(TILE * 5 + 3, 3, 10, 10)

  g.generateTexture('tiles', TILE * 6, TILE)
  g.destroy()
}

function generatePlayerSprites(scene: Phaser.Scene) {
  const frames = 4
  const w = 16
  const h = 24
  const g = scene.make.graphics({ x: 0, y: 0 })

  for (let f = 0; f < frames; f++) {
    const ox = f * w
    const legOffset = f % 2 === 0 ? 0 : 1

    // legs
    fillRect(g, ox + 5, 16 + legOffset, 2, 6, COLORS.playerPants)
    fillRect(g, ox + 9, 16 - legOffset, 2, 6, COLORS.playerPants)
    // coat
    fillRect(g, ox + 4, 10, 8, 7, COLORS.playerCoat)
    fillRect(g, ox + 3, 11, 1, 5, COLORS.playerCoat)
    fillRect(g, ox + 12, 11, 1, 5, COLORS.playerCoat)
    // head
    fillRect(g, ox + 5, 4, 6, 6, COLORS.playerSkin)
    fillRect(g, ox + 4, 5, 1, 4, 0x1a1a1a)
    fillRect(g, ox + 11, 5, 1, 4, 0x1a1a1a)
    fillRect(g, ox + 5, 3, 6, 2, 0x1a1a1a)
  }

  g.generateTexture('player', w * frames, h)

  const texture = scene.textures.get('player')
  for (let f = 0; f < frames; f++) {
    texture.add(String(f), 0, f * w, 0, w, h)
  }

  g.destroy()
}

function generateBuildingDecor(scene: Phaser.Scene) {
  const g = scene.make.graphics({ x: 0, y: 0 })

  // Agora storefront
  fillRect(g, 0, 0, 48, 32, COLORS.building)
  fillRect(g, 4, 8, 40, 20, 0x2a2218)
  fillRect(g, 8, 12, 32, 16, COLORS.agoraGlow)
  g.fillStyle(COLORS.agoraWarm, 1)
  g.fillRect(18, 20, 12, 2)
  // sign
  fillRect(g, 10, 2, 28, 6, COLORS.panelCream)
  g.fillStyle(COLORS.asphalt, 1)
  g.fillRect(14, 4, 20, 2)

  g.generateTexture('agora-building', 48, 32)
  g.clear()

  // Generic building
  fillRect(g, 0, 0, 40, 48, COLORS.building)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      fillRect(g, 8 + col * 16, 8 + row * 12, 8, 8, row === 0 ? COLORS.window : COLORS.windowDim)
    }
  }
  g.generateTexture('building', 40, 48)
  g.clear()

  // Coffee cup icon for interact
  fillRect(g, 0, 0, 12, 12, 0x000000)
  g.clear()
  g.fillStyle(COLORS.agoraWarm, 1)
  g.fillRect(2, 4, 8, 6)
  g.fillRect(1, 3, 10, 2)
  g.generateTexture('coffee-icon', 12, 12)
  g.destroy()
}

function generateZoneMarker(scene: Phaser.Scene) {
  const g = scene.make.graphics({ x: 0, y: 0 })
  g.fillStyle(COLORS.agoraWarm, 0)
  g.fillRect(0, 0, 16, 16)
  g.generateTexture('zone-marker', 16, 16)
  g.destroy()
}

export { TILE, COLORS }
