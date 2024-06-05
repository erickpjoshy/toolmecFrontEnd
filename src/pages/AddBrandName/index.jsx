import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import axios from '../../utilities/customAxios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const AddBrandName = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState({
    name: '',
    status: true,
    image: '',
    description: '',
  });
  const onChange = (e, key) => {
    if (key === 'status') {
      //   console.log(e.target.value);
      const bool = JSON.parse(e.target.value);
      setBrand({ ...brand, [key]: bool });
    }
    if (key === 'name' || key === 'description') {
      setBrand({ ...brand, [key]: e.target.value });
    }
  };
  const onUpload = async (e, key) => {
    if (brand.image) {
      //   console.log(category.image);
      const name = brand.image.split('4445/')[1];
      const response = await axios.post('/upload/delete', { image: name });
    }
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/upload/image', formData);
      setBrand({ ...brand, [key]: response.data.url });
    }
  };
  const onClick = async () => {
    const result = await axios.post('/brand', brand);
    navigate('/admin/list-brands');
  };
  return (
    <div className="mt-5">
      <h1 className="text-2xl text-primary text-center mb-5">ADD CATEGORY</h1>
      <div className="category-box bg-white min-h-60 p-5">
        <Input placeHolder="Brand name" onChange={e => onChange(e, 'name')} />
        <Select
          options={[{ name: 'true' }, { name: 'false' }]}
          placeHolder="Brand status"
          onChange={e => onChange(e, 'status')}
        />
        <Input
          type="file"
          placeHolder="Brand image"
          onChange={e => onUpload(e, 'image')}
        />
        <Input
          placeHolder="Description"
          onChange={e => onChange(e, 'description')}
        />
        <div className="flex justify-end">
          <Button onClick={onClick}>Add Brand</Button>
        </div>
      </div>
    </div>
  );
};

export default AddBrandName;
