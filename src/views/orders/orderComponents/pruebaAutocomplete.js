import { Stack, Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllOrder } from "../../../Services/oderService";
import { getAllProducts } from "../../../Services/productService";

const PruebaAutcomplete = () => {
  const [producuts, setProducts] = useState([]);
  const getProducts = async () => {
    const responserProducts = await getAllProducts();
    setProducts(responserProducts.data);
  };
  console.log(producuts);

  const orderOptions = producuts.map(
    (pro) =>
      pro.name +
      " - " +
      pro.brand.name +
      " - " +
      pro.category.name +
      " - " +
      pro.presentacion +
      " - " +
      pro.forma_farm
  );

  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState('');
  console.log(orderOptions);
  console.log(value1);

  const [lis, setList] = useState({
    name: "",
  });

  const handleChangle = async (event) => {
    await setList({
      ...lis,
      [event.target.name]: event.target.value
    });
  }

  if(value === null){
    const arr = value
    console.log(arr);
  }else{
    const arr = value.split(' - ')
    console.log(arr[0])
  }

  console.log(lis);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Stack spacing={2} width="550px">
        MuiAtuocomplete
        <Autocomplete
          options={orderOptions}
          renderInput={(params) => <TextField {...params} label="Orders " />}
          value={value}
          onChange={(_event, newValue) => setValue(newValue)}
          freeSolo
        />
      </Stack>
      <div>
        <input name="name" value={lis.name} onChange={handleChangle} ></input>
      </div>
    </>

  );
};

export default PruebaAutcomplete;
