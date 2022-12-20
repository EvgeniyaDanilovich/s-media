export const updateObjectInArray = (array, itemId, objPropName, newObjProps, ) => {
   return  array.map(item => {
        if (item[objPropName] === itemId) return { ...item, ...newObjProps };
        return item;
    });
};