import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ColmeiaForm({ colmeia, onSuccess }) {
  const [formData, setFormData] = useState(colmeia || { nome: '', localizacao: '', temperatura: '', umidade: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (colmeia?.id) {
        await axios.put(`/api/colmeias/${colmeia.id}`, formData);
      } else {
        await axios.post('/api/colmeias', formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar colmeia:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Nome" name="nome" value={formData.nome} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Localização" name="localizacao" value={formData.localizacao} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Temperatura" name="temperatura" value={formData.temperatura} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Umidade" name="umidade" value={formData.umidade} onChange={handleChange} fullWidth margin="normal" />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>Salvar</Button>
    </Box>
  );
}