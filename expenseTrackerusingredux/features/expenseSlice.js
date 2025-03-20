import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState={
    expenses:[{
        id:'1',
        title:"Vitamin E capsule",
        amount:90,
        category:"medicine",
        date:new Date().toLocaleDateString()
    }]
}


const expenseSlice=createSlice({
    name:"expense",
    initialState,
    reducers:{
        addexpense:(state,action)=>{
            const { title, amount, category, date } = action.payload;
            const expense={
                id:nanoid(),
                title:title,
                amount:amount,
                category:category,
                date:date,
            }
            state.expenses.push(expense)
        },
        deleteexpense:(state,action)=>{
            state.expenses=state.expenses.filter(expense=>expense.id !==action.payload)
        },

    }

})
export const {addexpense,deleteexpense}=expenseSlice.actions;

export default expenseSlice.reducer;