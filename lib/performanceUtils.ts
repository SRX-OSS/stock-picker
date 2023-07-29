export const removeDuplicatesObjectArray = (
  arrayList: any[],
  keyProperty: string
): any[] => {
  let hashMap: any = {};
  let result: any = [];

  arrayList?.map((item: any, index: number) => {
    if (hashMap[item?.[keyProperty]] !== true) {
      result.push(item);
      hashMap[item?.[keyProperty]] = true;
    }
  });

  return result;
};
