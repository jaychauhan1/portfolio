import Phaser from 'phaser'
import { generateTextures } from '../createTextures'
import { emitLoadingProgress } from '../events'

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    emitLoadingProgress(10)
  }

  create() {
    emitLoadingProgress(40)
    generateTextures(this)
    emitLoadingProgress(70)
    this.scene.start('WorldScene')
  }
}
