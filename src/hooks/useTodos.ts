import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../configs/firebase";

export interface Todo {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

export function useTodos(){
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const load = async () =>{
            setLoading(true);
            const q = query(collection(db, "todos"), orderBy("createdAt","asc"));
            try{
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) =>({
                    id: doc.id,
                    ...doc.data(),
                })) as Todo[];
                setTodos(data);
            }catch(error){
                console.log("Error en useEffect: ", error)
            }finally {
                setLoading(false); // <- importante
            }
            
        };
        load();
    },[]);

    const addTodo = async (title: string, category: string) =>{
        console.log("addTodo fue llamado");
        const newTodo = {
            title,
            category,
            completed: false,
            createdAt: Timestamp.now(),
        };

        try {
            const docRef = await addDoc(collection(db, "todos"), newTodo);
            console.log("Tarea agregada");
            setTodos((prev) => [...prev, { id: docRef.id, ...newTodo }]);
        } catch (error) {
            console.error("Error al agregar tarea:", error);
        }
    };

    const toggleTodo = async (id: string) =>{
        const ref = doc(db,"todos",id);
        const current = todos.find((t)=> t.id === id);
        if(!current) return;
        await updateDoc(ref, {completed: !current.completed});
        setTodos((prev)=> prev.map((t)=> t.id === id? {...t,completed: !t.completed} : t));
    }

    const deleteTodo = async (id:string) =>{
        await deleteDoc(doc(db,"todos",id));
        setTodos((prev)=> prev.filter((t)=> t.id !== id));
    }
    return { todos, loading, addTodo, toggleTodo, deleteTodo };
}