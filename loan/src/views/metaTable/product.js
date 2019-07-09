export const channelMeta = [
  {
    label: '频道编号',
    prop: 'appType',
    type: 'string',
    visible: true,
    order: 1
  },
  {
    label: '频道名称',
    prop: 'name',
    type: 'string',
    visible: true,
    order: 2
  },
  {
    label: '频道优先级',
    prop: 'advancedNumber',
    type: 'string',
    visible: true,
    order: 3
  },
  {
    label: '创建时间',
    prop: 'updateTime',
    type: 'time',
    visible: true,
    order: 4
  },
  {
    label: '状态',
    prop: 'deleteTime',
    type: 'switch',
    visible: true,
    order: 5
  },
  {
    label: '操作',
    prop: '',
    type: 'op',
    width: 180,
    visible: true,
    order: 6
  }
]
export const tagMeta = [

]
export const listMeta = [

]
export default {
  channelMeta,
  tagMeta,
  listMeta
}
