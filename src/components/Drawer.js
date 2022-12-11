import React from "react"
import {Drawer} from 'antd';

const DrawerView = (props) => {
    const onClose = () => {
        props.setShowDrawer(false);
    };
   return   <Drawer
       header={false}
       placement={"left"}
       width={500}
       onClose={onClose}
       open={props.showDrawer}

   >

       <h3>{props.viewData.id}</h3>
       <h5>{props.viewData.title}</h5>
       <p>{props.viewData.body}</p>
   </Drawer>

}
export default DrawerView