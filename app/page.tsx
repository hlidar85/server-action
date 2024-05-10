
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";

async function addTodo(formdata:FormData) {
  'use server'
  const todoDAta = await formdata.get('item')
  console.log('hello ' + todoDAta)
  let newToDo
  if(todoDAta)
    newToDo = await prisma.toDo.create({data: {toDo: todoDAta as string}}) 

  revalidatePath('/')
}

export default async function Home() {
  const toDos = await prisma.toDo.findMany()
  return ( 
    <>
    <main >
        <div className="border">
      <form action={addTodo} >

        <label>To Do</label>
        <input name="item" type="text"></input>
        <div>

        <button type="submit">submit todo</button>
        </div>
      </form>
        </div>
        <div>
        <ul>
          <li key='pla'>heder</li>
          {toDos.map((toDo)=> <li key={toDo.id}>{toDo.toDo}</li>)}
        </ul>
        </div>
    </main>
    </>
  );
}
