import { SortDirection } from "../type.d";

export const sortData = (
  data: any,
  sortType: SortDirection.ASC | SortDirection.DESC,
  sortCategory: string
) => {
  return data.sort((a: any, b: any) => {
    if (sortType === SortDirection.ASC) {
      if (a[sortCategory] < b[sortCategory]) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (a[sortCategory] < b[sortCategory]) {
        return 1;
      } else {
        return -1;
      }
    }
  });
};
