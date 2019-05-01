import LODNode from './LODNode';

export default class LODManager {
  private isPreloaded: boolean;
  private lod: LODNode;

  constructor(id: number) {
    this.lod = new LODNode(id, 512, 0, 0);
    this.lod.next = new LODNode(id, 1024, 1, 0);
    //this.lod.next.next = new LODNode(id, 2048, 2, 1);
    //this.lod.next = new LODNode(id, 1024, 1);
    //this.lod = new LODNode(id, 2048, 2);
    //this.lod = new LODNode(id, 1024, 1);
  }

  public initialize = (gl: WebGLRenderingContext): void => {
    this.lod.initialize(gl);
    this.lod.next.initialize(gl);
    //this.lod.next.next.initialize(gl);
  };

  public update = (): void => {
    if (this.lod.next && this.lod.next.isBuffered()) {
      this.lod = this.lod.next;
    }
  };

  public buffer = (): void => {
    this.lod.buffer();
    if (this.lod.isBuffered() && this.lod.next) {
      this.lod.next.buffer();
    }
  };

  public bind = (): void => {
    this.lod.bind();
  };

  public preload = (imagePathRoot: string): Promise<any> => {
    if (!this.isPreloaded) {
      this.isPreloaded = true;
      return this.lod.load(imagePathRoot);
    } else {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  };

  public getBestTexture = (): number => {
    console.log(this.lod.getTextureOffset());
    return this.lod.getTextureOffset();
  };

  public load = (imagePathRoot: string): Promise<any> => {
    let current = this.lod;

    const promises: Promise<any>[] = [];

    while (current !== null && current !== undefined) {
      promises.push(current.load(imagePathRoot));

      current = current.next;
    }

    return Promise.all(promises);
  };
}
