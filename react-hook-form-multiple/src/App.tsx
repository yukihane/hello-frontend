import { useForm, useFieldArray } from 'react-hook-form'
import './App.css'

interface User {
  name: string
  age: string
}

interface FormData {
  users: User[]
}

function App() {
  const { control, handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      users: [{ name: '', age: '' }]
    }
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'users'
  })

  const onSubmit = (data: FormData) => {
    console.log('送信データ:', JSON.stringify(data, null, 2))
  }

  const addUser = () => {
    append({ name: '', age: '' })
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>ユーザー情報入力フォーム</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>{index + 1}人目</h3>
            <div style={{ marginBottom: '10px' }}>
              <label>
                ユーザー名:
                <input
                  {...register(`users.${index}.name` as const)}
                  style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
                />
              </label>
            </div>
            <div>
              <label>
                年齢:
                <input
                  {...register(`users.${index}.age` as const)}
                  type="number"
                  style={{ marginLeft: '10px', padding: '5px', width: '100px' }}
                />
              </label>
            </div>
          </div>
        ))}
        
        <div style={{ marginBottom: '20px' }}>
          <button 
            type="button" 
            onClick={addUser}
            style={{ 
              padding: '10px 20px', 
              marginRight: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            追加
          </button>
          
          <button 
            type="submit"
            style={{ 
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            送信
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
