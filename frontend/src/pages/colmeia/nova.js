import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography } from '@mui/material';

export default function NovaColmeia() {
  const [form, setForm] = useState({ nome: '', localizacao: '', temperatura: '', umidade: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      nome: form.nome,
      localizacao: form.localizacao,
      temperatura: parseFloat(form.temperatura),
      umidade: parseFloat(form.umidade),
    };
  
    console.log('Enviando dados:', formData);
  
    try {
      // Ajuste a URL aqui para corresponder ao Insomnia
      await axios.post('http://localhost:3000/colmeias', formData);
      alert('Colmeia cadastrada com sucesso!');
      router.push('/');
    } catch (error) {
      console.error('Erro ao cadastrar colmeia:', error);
      alert('Erro ao cadastrar colmeia.');
    }
  };
  
  
  

  return (
    <Container>
      <Typography variant="h4">Cadastrar Nova Colmeia</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          name="nome" 
          label="Nome" 
          fullWidth 
          margin="normal" 
          onChange={handleChange} 
          required 
        />
        <TextField 
          name="localizacao" 
          label="Localização" 
          fullWidth 
          margin="normal" 
          onChange={handleChange} 
          required 
        />
        <TextField 
          name="temperatura" 
          label="Temperatura" 
          type="number" 
          fullWidth 
          margin="normal" 
          onChange={handleChange} 
          required 
        />
        <TextField 
          name="umidade" 
          label="Umidade" 
          type="number" 
          fullWidth 
          margin="normal" 
          onChange={handleChange} 
          required 
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '10px' }}
        >
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}
