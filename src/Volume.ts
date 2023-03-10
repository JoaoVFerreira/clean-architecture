class Volume {
  constructor (
    private readonly width: number,
    private readonly height: number,
    private readonly length: number
  ) { this.validateConstructor(); }

  public getVolume(): number {
    return this.height * this.length * this.width;
  }

  private validateConstructor() {
    if (this.width || this.height || this.length < 0) {
      throw new Error(
        'It is not possible to build a class with negative values for one of them: width, height or lenght'
      );
    }
  }
}

export { Volume };