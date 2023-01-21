import { TUser } from '../models/common-types';

export const updateObjectInArray = (array: TUser[], itemId: number, objPropName: string, newObjProps: {followed: boolean}, ) => {
   return  array.map(item => {
        // @ts-ignore
       if (item[objPropName] === itemId) return { ...item, ...newObjProps };
        return item;
    });
};
