import {
  Item,
  type IRawItem,
  ItemType,
} from "@/features/fileList/types/fileListTypes";

/**
 * Создать вложенный список файлов из данных api
 */
export function getNestedFileList(items: IRawItem[]): Item[] {
  const itemMap = new Map<number, Item>();
  const result: Item[] = [];

  items.forEach((rawItem) => {
    const currentItem = itemMap.get(rawItem.id) || new Item(rawItem);
    itemMap.set(rawItem.id, currentItem);

    if (rawItem.parentId !== null) {
      const parent =
        itemMap.get(rawItem.parentId) ||
        new Item({
          id: rawItem.parentId,
          type: ItemType.dir,
          parentId: null,
          // т.к. верхняя папка
          name: "Ваши файлы",
          isFavorite: false,
        });
      parent.addChild(currentItem);
      itemMap.set(rawItem.parentId, parent);
    } else {
      result.push(currentItem);
    }
  });

  return result;
}
