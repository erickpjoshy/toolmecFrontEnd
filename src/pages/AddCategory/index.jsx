import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import axios from '../../utilities/customAxios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import uploadImage from '../../helpers/uploadProduct';
const AddCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    status: true,
    image: '',
  });
  const onChange = (e, key) => {
    if (key === 'status') {
      //   console.log(e.target.value);
      const bool = JSON.parse(e.target.value);
      setCategory({ ...category, [key]: bool });
    }
    if (key === 'name') {
      setCategory({ ...category, [key]: e.target.value });
    }
  };
  // ---------------------------START IMAGE UPLOAD OLD CODE----------------------------

  // const onUpload = async (e, key) => {
  //   if (category.image) {
  //     //   console.log(category.image);
  //     const name = category.image.split('4445/')[1];
  //     const response = await axios.post('/upload/delete', { image: name });
  //   }
  //   const file = e.target.files[0];
  //   console.log(file);
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     const response = await axios.post('/upload/image', formData);
  //     setCategory({ ...category, [key]: response.data.url });
  //   }
  // };
  // ---------------------------STOP IMAGE UPLOAD OLD CODE----------------------------

  // ---------------------------START IMAGE UPLOAD NEW CODE----------------------------
  const onUpload = async (e, key) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setCategory({
      ...category,
      [key]: uploadImageCloudinary.url,
    });
  };
  // ---------------------------STOP IMAGE UPLOAD NEW CODE----------------------------

  const onClick = async () => {
    const result = await axios.post('/category', category);
    navigate('/admin/list-categories');
  };
  console.log(category);
  return (
    <div className="mt-5">
      <h1 className="text-2xl text-primary text-center mb-5">ADD CATEGORY</h1>
      <div className="category-box bg-white min-h-60 p-5">
        <Input
          placeHolder="Category name"
          onChange={e => onChange(e, 'name')}
        />
        <Select
          options={[{ name: 'true' }, { name: 'false' }]}
          placeHolder="Category status"
          onChange={e => onChange(e, 'status')}
        />
        <Input
          type="file"
          placeHolder="Category image"
          onChange={e => onUpload(e, 'image')}
        />
        <div className="flex justify-end">
          <Button onClick={onClick}>Add Category</Button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
