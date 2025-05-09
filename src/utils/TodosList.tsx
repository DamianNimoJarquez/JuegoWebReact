import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

const TodosList = () => {
    const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const grouped = todos.reduce<Record<string, typeof todos>>((acc, todo) => {
        if (!acc[todo.category]) acc[todo.category] = [];
        acc[todo.category].push(todo);
        return acc;
    }, {});

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        if(title.trim() && category.trim()){
            await addTodo(title,category);
            setTitle("");
        }
    }

    if(loading) return <div>Cargando Tareas...</div>
    return ( 
        <>
            <div className="p-4 max-w-xl mx-auto space-y-6 bg-cyan-800">
                <h1 className="text-2xl font-bold mb-4">Agregar Tarea:</h1>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex felx col gap-2">
                        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)}
                        required className="border rounded-full px-3 py-2 border-blue-400 bg-amber-200"/>
                        <input type="text" placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)}
                        required className="border rounded-full px-3 py-2 border-blue-400 bg-amber-200"/>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold pl-4
                        px-3 py-2 rounded-full">
                            Añadir Tarea</button>
                    </div>
                </form>
                <h1 className="text-2xl font-bold mb-4">Tareas:</h1>
                {/** Lista de Tareas */}
                {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 border-b pb-1">{category}</h2>
                        <ul className="space-y-2">
                            {items.map((todo) => (
                                <li key={todo.id} className="flex items-center justify-between py-1">
                                    <span
                                    onClick={() => toggleTodo(todo.id)}
                                    className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                                >
                                        {todo.title}
                                    </span>
                                    <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                        Borrar
                                    </button>
                                </li>
                        ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
     );
}
 
export default TodosList;