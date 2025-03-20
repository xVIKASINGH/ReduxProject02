import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addexpense } from '../features/expenseSlice';
import { deleteexpense } from '../features/expenseSlice';
function AddExpense() {
    const expenses=useSelector(state=>state.expenses)
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();
     const [filterCategory,setfilterCategory]=useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !category || !date) return alert('Please fill all fields');

        const newTransaction = {
            id: Date.now(),
            title,
            amount: parseFloat(amount),
            category,
            date
        };

        dispatch(addexpense(newTransaction));
        setTitle('');
        setAmount('');
        setCategory('');
        setDate('');
    };

    const handledelete=(id)=>{
        dispatch(deleteexpense(id));

        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        setfilterCategory(updatedExpenses);
    }
    const handlefilter=(e)=>{
        const selectedcategory=e.target.value;
        if(selectedcategory==='' || selectedcategory==="All_Categories"){
            setfilterCategory(expenses);
        }
        else{
            const fitlerexpense=expenses.filter(expense=>
                expense.category===selectedcategory
            );
            setfilterCategory(fitlerexpense)
            
        }
     
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black p-8">
            {/* Left Side: Add Expense Form */}
            <div className="w-1/3 bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-xl mr-8">
                <h2 className="text-3xl text-white font-bold text-center mb-6">💸 Add Expense</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                    />

                    <input
                        type="number"
                        placeholder="Amount (₹)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Income">💰 Income</option>
                        <option value="Food">🍕 Food</option>
                        <option value="Travel">✈️ Travel</option>
                        <option value="Entertainment">🎥 Entertainment</option>
                        <option value="Bills">📑 Bills</option>
                        <option value="Other">🔍 Other</option>
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-indigo-600 rounded-lg text-white text-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
                    >
                        Add Transaction
                    </button>
                </form>
            </div>

            {/* Right Side: Displaying All Expenses */}
            <div className="w-2/3 bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-xl overflow-y-auto h-[90vh]">
            <h2 className="text-3xl text-white font-bold mb-6">📊 All Expenses</h2>
            <div className='flex items-center space-x-3'>
    <h3 > 
    <i className="fa-solid fa-filter"></i>
    </h3>
    <select className="p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-2"onChange={handlefilter}>
        <option value=""> All_Categories</option>
        <option value="Income">Income</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
    </select>
</div>

{filterCategory.length > 0 ? (
    filterCategory.map((expense) => (
        <div
            key={expense.id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md text-white mb-4"
        >
            <div>
                <h3 className="text-xl font-semibold">{expense.title}</h3>
                <p className="text-sm text-gray-400">{expense.category} - {expense.date}</p>
            </div>
            <span className={`text-lg font-bold ${expense.category === 'Income' ? 'text-green-500' : 'text-red-500'}`}>
                {expense.category === 'Income' ? `+ ₹${expense.amount}` : `- ₹${expense.amount}`}
            </span>
            <span>
                <button onClick={() => handledelete(expense.id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </span>
        </div>
    ))
) : (
    <p className="text-gray-400">No expenses found for the selected category.</p>
)}
        </div>
        </div>
    );
}

export default AddExpense;
