import * as React from 'react'
import Box from '@mui/material/Box'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem, type TreeItemProps } from '@mui/x-tree-view/TreeItem'
import type { FatherItem, ItemTree, TreeItemActionHandlers } from './class/TreeItems';

interface CustomTreeViewProps extends TreeItemActionHandlers {
  customComponentItem?: React.ComponentType<
    TreeItemProps & { obj?: ItemTree } & TreeItemActionHandlers
  >
  data: ItemTree[]
}




const CustomTreeView: React.FC<CustomTreeViewProps> = ({
  customComponentItem,
  data,
  onAddChild,
  onEditNode,
  onDeleteNode,
}) => {

   const Item = (customComponentItem ?? TreeItem) as React.ComponentType<
    TreeItemProps & { obj?: ItemTree } & TreeItemActionHandlers
  >

  
  const renderTree = (nodes: ItemTree[], prefix = ''): React.ReactNode[] => {

    return nodes.map((node, idx) => {
    
      const rawId = String(node.id ?? idx);      
      const itemId = prefix ? `${prefix}/${rawId}` : rawId;
      const key = itemId;
      const label = (node as any).label as string

    
      let children: React.ReactNode[] | undefined
      
      if (node.isComposite()) {      
        children = renderTree((node as FatherItem).getChildren(),itemId)
      }


      return (
        <Item 
        key={key} 
        itemId={itemId} 
        label={label} 
        obj={node}
        onAddChild={onAddChild}
        onEditNode={onEditNode}
        onDeleteNode={onDeleteNode}
        >
          {children}
        </Item>
      )
    });
  }

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        {renderTree(data)}
      </SimpleTreeView>
    </Box>
  )
}

export default CustomTreeView
