import Phaser from 'phaser'
import {
  buildCollisionLayer,
  buildGroundLayer,
  MAP_HEIGHT,
  MAP_WIDTH,
  SPAWN,
  TILE,
  ZONES,
  type ZoneDef,
} from '../mapData'
import { emitGameReady, emitLoadingProgress, emitZoneEnter, emitZoneExit } from '../events'

const PLAYER_SPEED = 90

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd!: {
    W: Phaser.Input.Keyboard.Key
    A: Phaser.Input.Keyboard.Key
    S: Phaser.Input.Keyboard.Key
    D: Phaser.Input.Keyboard.Key
  }

  private collisionLayer!: Phaser.Physics.Arcade.StaticGroup
  private zoneRects: Array<{ zone: ZoneDef; rect: Phaser.Geom.Rectangle }> = []
  private activeZoneId: string | null = null
  private interactKey!: Phaser.Input.Keyboard.Key
  private hintText!: Phaser.GameObjects.Text
  private skyline!: Phaser.GameObjects.Rectangle[]

  constructor() {
    super('WorldScene')
  }

  create() {
    this.drawGround()
    this.drawSkyline()
    this.drawBuildings()
    this.setupCollision()
    this.setupZones()
    this.setupPlayer()
    this.setupCamera()
    this.setupInput()
    this.setupHintUI()

    emitLoadingProgress(100)
    emitGameReady()
  }

  private drawGround() {
    const ground = buildGroundLayer()
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const tileIndex = ground[y][x]
        this.add
          .image(x * TILE + TILE / 2, y * TILE + TILE / 2, 'tiles', tileIndex)
          .setDepth(0)
      }
    }
  }

  private drawSkyline() {
    this.skyline = []
    const colors = [0x0d0d10, 0x151518, 0x1a1a22, 0x12121a]
    for (let i = 0; i < 12; i++) {
      const h = Phaser.Math.Between(40, 120)
      const w = Phaser.Math.Between(30, 80)
      const rect = this.add
        .rectangle(i * 70 + 20, MAP_HEIGHT * TILE - h / 2 - 20, w, h, colors[i % colors.length], 0.6)
        .setDepth(-1)
      this.skyline.push(rect)
    }
  }

  private drawBuildings() {
    this.add.image(14 * TILE, 13 * TILE, 'agora-building').setDepth(2)
    this.add.image(30 * TILE, 10 * TILE, 'building').setDepth(2).setTint(0xcccccc)
    this.add.image(38 * TILE, 17 * TILE, 'building').setDepth(2).setTint(0x888899)
    this.add.image(38 * TILE, 27 * TILE, 'building').setDepth(2).setTint(0x9999aa)
    this.add.image(45 * TILE, 17 * TILE, 'building').setDepth(2).setScale(0.8)
    this.add.image(33 * TILE, 28 * TILE, 'building').setDepth(2).setTint(0xaaaaaa).setScale(0.9)

    // Zone labels
    const labels: Array<[number, number, string]> = [
      [14 * TILE, 12.5 * TILE, 'AGORA'],
      [35 * TILE, 3.5 * TILE, 'UH CAMPUS'],
      [38 * TILE, 13 * TILE, 'LYONDELL'],
      [38 * TILE, 23 * TILE, 'RESEARCH'],
      [45 * TILE, 13 * TILE, 'TCS'],
      [33 * TILE, 25 * TILE, 'PROJECTS'],
      [6 * TILE, 5 * TILE, 'ROOFTOP'],
      [4.5 * TILE, 15 * TILE, 'COURT'],
    ]

    for (const [x, y, text] of labels) {
      this.add
        .text(x, y, text, {
          fontFamily: 'monospace',
          fontSize: '6px',
          color: '#c4a882',
        })
        .setOrigin(0.5)
        .setDepth(3)
        .setAlpha(0.7)
    }

    // Warm glow around Agora
    const glow = this.add.rectangle(14 * TILE, 17 * TILE, 80, 60, 0xc4a882, 0.08)
    glow.setDepth(1)
  }

  private setupCollision() {
    this.collisionLayer = this.physics.add.staticGroup()
    const collision = buildCollisionLayer()

    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        if (collision[y][x] === 1) {
          const block = this.collisionLayer.create(
            x * TILE + TILE / 2,
            y * TILE + TILE / 2,
            'zone-marker',
          ) as Phaser.Physics.Arcade.Sprite
          block.setVisible(false)
          block.refreshBody()
        }
      }
    }
  }

  private setupZones() {
    for (const zone of ZONES) {
      const rect = new Phaser.Geom.Rectangle(zone.x, zone.y, zone.width, zone.height)
      this.zoneRects.push({ zone, rect })
    }
  }

  private setupPlayer() {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1,
    })

    this.player = this.physics.add
      .sprite(SPAWN.x, SPAWN.y, 'player', 0)
      .setDepth(5)
      .setCollideWorldBounds(true)

    this.player.setSize(10, 8)
    this.player.setOffset(3, 14)

    this.physics.add.collider(this.player, this.collisionLayer)
  }

  private setupCamera() {
    this.cameras.main.setBounds(0, 0, MAP_WIDTH * TILE, MAP_HEIGHT * TILE)
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
    this.cameras.main.setZoom(2)
  }

  private setupInput() {
    if (!this.input.keyboard) return
    this.cursors = this.input.keyboard.createCursorKeys()
    this.wasd = {
      W: this.input.keyboard.addKey('W'),
      A: this.input.keyboard.addKey('A'),
      S: this.input.keyboard.addKey('S'),
      D: this.input.keyboard.addKey('D'),
    }
    this.interactKey = this.input.keyboard.addKey('E')

    this.input.keyboard.on('keydown-ESC', () => {
      emitZoneExit()
      this.activeZoneId = null
    })
  }

  private setupHintUI() {
    this.hintText = this.add
      .text(0, 0, '', {
        fontFamily: 'monospace',
        fontSize: '7px',
        color: '#f5f0e8',
        backgroundColor: '#2c2c2ccc',
        padding: { x: 4, y: 2 },
      })
      .setScrollFactor(0)
      .setDepth(100)
      .setVisible(false)
  }

  update(_time: number, _delta: number) {
    this.handleMovement()
    this.handleZones()
    this.parallaxSkyline()
    this.updateHintPosition()
  }

  private handleMovement() {
    if (!this.cursors || !this.wasd) return

    let vx = 0
    let vy = 0

    if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -1
    else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = 1

    if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -1
    else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = 1

    if (vx !== 0 && vy !== 0) {
      vx *= 0.707
      vy *= 0.707
    }

    this.player.setVelocity(vx * PLAYER_SPEED, vy * PLAYER_SPEED)

    if (vx !== 0 || vy !== 0) {
      this.player.anims.play('walk', true)
      this.player.setFlipX(vx < 0)
    } else {
      this.player.anims.stop()
      this.player.setFrame(0)
    }
  }

  private handleZones() {
    const px = this.player.x
    const py = this.player.y

    let found: ZoneDef | null = null
    for (const { zone, rect } of this.zoneRects) {
      if (Phaser.Geom.Rectangle.Contains(rect, px, py)) {
        found = zone
        break
      }
    }

    if (found) {
      this.hintText.setText(`[E] ${found.label}`)
      this.hintText.setVisible(true)

      if (
        this.interactKey &&
        Phaser.Input.Keyboard.JustDown(this.interactKey) &&
        this.activeZoneId !== found.id
      ) {
        this.activeZoneId = found.id
        emitZoneEnter({
          section: found.section,
          zoneId: found.id,
          label: found.label,
        })
      }
    } else {
      this.hintText.setVisible(false)
      if (this.activeZoneId) {
        this.activeZoneId = null
      }
    }
  }

  private parallaxSkyline() {
    const camX = this.cameras.main.scrollX
    this.skyline.forEach((rect, i) => {
      rect.x = i * 70 + 20 + camX * 0.05
    })
  }

  private updateHintPosition() {
    const cam = this.cameras.main
    this.hintText.setPosition(cam.scrollX + 8, cam.scrollY + cam.height / cam.zoom - 24)
  }
}
