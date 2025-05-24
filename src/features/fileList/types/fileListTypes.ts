/**
 * Перечисление типов элементов (папка или файл)
 */
export enum ItemType {
  dir = "dir",
  file = "file",
}
/**
 * Перечисление расширений файлов
 */
export enum FileExtension {
  jpg = ".jpg",
  gif = ".gif",
  docx = ".docx",
}

/**
 * Входные данные об элементе списка файлов
 */
export interface IRawItem {
  readonly id: number;
  readonly type: ItemType;
  readonly parentId: number | null;
  readonly name: string;
  readonly isFavorite: boolean;
}

/**
 * Преобразованный для ui элемент списка файлов
 */
export class Item implements IRawItem {
  public readonly id: number;
  public readonly type: ItemType;
  public readonly parentId: number | null;
  public readonly name: string;
  public readonly isFavorite: boolean;

  public children: Item[] = [];
  public extension: FileExtension | null = null;

  constructor(raw: IRawItem) {
    this.id = raw.id;
    this.type = raw.type;
    this.parentId = raw.parentId;
    this.name = raw.name;
    this.isFavorite = raw.isFavorite;

    // Определение расширения для файлов и запись поля extension
    if (this.type === ItemType.file) {
      const lastDotIndex = this.name.lastIndexOf(".");
      if (lastDotIndex !== -1) {
        const ext = this.name
          .slice(lastDotIndex)
          .toLowerCase() as FileExtension;
        this.extension = ext;
      }
    }
  }

  /**
   * Type guard для Item
   */
  static isItem(item: unknown): item is Item {
    return item instanceof Item;
  }

  /**
   * Проверка, что расширение файла относится к изображениям
   */
  isImage(): boolean {
    return (
      !!this.extension &&
      [FileExtension.gif, FileExtension.jpg].includes(this.extension)
    );
  }

  /**
   * Добавление дочерних элементов в поле children
   */
  addChild(item: Item): void {
    this.children.push(item);
  }
}
