import {
  Item,
  type IRawItem,
  ItemType,
} from "@/features/fileList/types/fileListTypes";

interface IGetNestedFileListReturnValue {
  itemMap: Map<Item["id"], Item>;
  idWithoutParent: number;
}

/**
 * Создать вложенный список файлов из данных api
 */
export function getNestedFileList(
  items: IRawItem[]
): IGetNestedFileListReturnValue {
  const itemMap = new Map<number, Item>();
  let idWithoutParent = 0;
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
      idWithoutParent = rawItem.id;
    }
  });

  return { itemMap, idWithoutParent };
}
