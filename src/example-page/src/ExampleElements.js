import React, { useState } from 'react';

const ExampleElements = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  
  const handleInputChange = e => setInputValue(e.target.value);
  const handleSelectChange = e => setSelectValue(e.target.value);
  const handleTextareaChange = e => setTextareaValue(e.target.value);
  return (
    <div className='example-elements'>
      <button disabled>Disabled Button</button>
      
      <button>Regular Button</button>

      <a href='#'>Anchor</a>
      
      <input type='text' name='exampleInput' value={inputValue} onChange={handleInputChange} />
      
      <select name='exampleSelect' value={selectValue} onChange={handleSelectChange}>
        <option value='1'>1</option>
        <option value='2'>2</option>
      </select>
      
      <textarea onChange={handleTextareaChange} value={textareaValue} />
    </div>
  );
};

export default ExampleElements;