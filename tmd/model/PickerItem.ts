/**
 * Created by Widiana Putra on 06/06/2022
 * Copyright (c) 2022 - Made with love
 */
export type PickerItem = {
  id: number | string,
  name: string,
  image?: string
  description?: string
}

export type CustomRenderItemType ={
  item: PickerItem,
  onSelect: (item: PickerItem) => void
  isSelected: boolean
}
