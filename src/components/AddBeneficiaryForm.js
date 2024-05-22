import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBeneficiary, editBeneficiary, removeBeneficiary } from '../reducers/beneficiaries';
import { useForm } from 'react-hook-form';

const AddBeneficiaryForm = () => {
  const beneficiaries = useSelector(state => state.beneficiaries.beneficiaries);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    // Clear form inputs
    setName('');
    setAccountNum('');
    setBankname('');
    setAccounttype('');
  };
  
  // State to store form input values
  const [name, setName] = useState('');
  const [accountNumber, setAccountNum] = useState('');
  const [bankname, setBankname] = useState('');
  const [accounttype, setAccounttype] = useState('');
  
  const [editIndex, setEditIndex] = useState(null);
  const [removeIndex, setRemoveIndex] = useState(null);
  const [editData, seteditData] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [showModalNotify, setshowModalNotify] = useState(false);
  const [showModalAdd, setshowModalAdd] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [showModalRemove, setshowModalRemove] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // Flag to track mounted/unmounted state
    // Fetch data from mock API and update Redux store
    if (isMounted) {
    fetch('https://mock-api-1-qbee.onrender.com/api/users')
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          data.forEach(beneficiary => dispatch(addBeneficiary(beneficiary)));
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]); 

  
  // Function to handle form submission
  const onSubmit = (data) => {
    if (editIndex === null) {
      setshowModalAdd(true)
    } else {
      setshowModalEdit(true)
      seteditData(data)
    }
  };

  // Function to handle add beneficiary
  const addDetails = () => {
    setshowModalAdd(false);
    dispatch(addBeneficiary({ name, accountNumber, bankname, accounttype }));
    // Clear form inputs
    setName('');
    setAccountNum('');
    setBankname('');
    setAccounttype('');
    setshowModalNotify(true);
    setTimeout(() => {
     setshowModalNotify(false);
  }, 3000); 
  }

  // Function to handle remove beneficiary
  const handleRemove = (id) => {
    setRemoveIndex(id);
    setshowModalRemove(true)
  };

  const removeDetails = () => {
    setshowModalRemove(false)
    dispatch(removeBeneficiary(removeIndex));
    setshowModalNotify(true);
   setTimeout(() => {
    setshowModalNotify(false);
  }, 3000); 
  };

  // Function to handle view beneficiary details
  const handleDetails = (index) => {
    setshowModal(true);
    const beneficiaryToView = beneficiaries[index];
    console.log(beneficiaryToView.name);
    setName(beneficiaryToView.name); 
    setAccountNum(beneficiaryToView.accountNumber);
    setBankname(beneficiaryToView.bankname);
    setAccounttype(beneficiaryToView.accounttype);
  }

  // Function to handle beneficiary editing
  const handleEdit = (index) => {
    setIsVisible(true)
    const beneficiaryToEdit = beneficiaries[index];
    setName(beneficiaryToEdit.name);
    setAccountNum(beneficiaryToEdit.accountNumber);
    setBankname(beneficiaryToEdit.bankname);
    setAccounttype(beneficiaryToEdit.accounttype);
    setEditIndex(index);
  };

  const updateDetails = () => {
    setshowModalEdit(false);
    // Edit existing beneficiary
    dispatch(editBeneficiary({ index: editIndex, newData: editData }));
    setEditIndex(null);
    setName('');
    setAccountNum('');
    setBankname('');
    setAccounttype('');
    setshowModalNotify(true);
    setTimeout(() => {
    setshowModalNotify(false);
  }, 3000); 
  }

  
  return (
    <div>
      
      {isVisible && (
            <form className='formT' onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-md-12'>
                  <h2>{editIndex === null ? 'Add' : 'Edit'} Beneficiary</h2>
                </div>
              </div>
            <div className='row'>
                <div className="col-md-6 mb-3 mt-3">
                    <label className='form-label'>Name</label>
                    <input className='form-control'
                        type="text"
                        value={name}
                        {...register('name', { required: 'Name is required' })}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
                </div>
                <div className="col-md-6 mb-3 mt-3">
                    <label className='form-label'>Account Number</label>
                    <input className='form-control'
                        type="text"
                        value={accountNumber}
                        {...register('accountnumber', { required: 'Account Number is required' })}
                        onChange={(e) => setAccountNum(e.target.value)}
                    />
                    {errors.accountnumber && <span style={{ color: 'red' }}>{errors.accountnumber.message}</span>}
                </div>
                <div className="col-md-6 mb-3 mt-3">
                    <label className='form-label'>Bank Name</label>
                    <input className='form-control'
                        type="text"
                        value={bankname}
                        {...register('bankname', { required: 'Bank Name is required' })}
                        onChange={(e) => setBankname(e.target.value)}
                    />
                    {errors.bankname && <span style={{ color: 'red' }}>{errors.bankname.message}</span>}
                </div>
                <div className="col-md-6 mb-3 mt-3">
                    <label className='form-label'>Type Of Account</label>
                    <input className='form-control'
                        type="text"
                        value={accounttype}
                        {...register('accounttype', { required: 'Bank Name is required' })}
                        onChange={(e) => setAccounttype(e.target.value)}
                    />
                    {errors.accounttype && <span style={{ color: 'red' }}>{errors.accounttype.message}</span>}
                </div>
        </div>
        
        <button type="submit" className='btn btn-primary'>{editIndex === null ? 'Add' : 'Edit'}</button>
        <button type="button" onClick={toggleVisibility} className='btn btn-light ms-3'>Cancel</button>
      </form>
            )}
            <div className='text-end mt-3'>
        <button type='button' onClick={toggleVisibility} className='btn btn-primary'>Add Beneficiary</button>
      </div>
      <h2>Beneficiaries List</h2>
      
      <table className='table table-striped bx'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Account Number</th>
                <th>Bank Name</th>
                <th className='tstyle'>Action</th>
            </tr>
        </thead>
        <tbody>
            {beneficiaries.map((beneficiary, index) => (
                <tr key={index}>
                    <td>{beneficiary.name}</td>
                    <td>{beneficiary.accountNumber}</td>
                    <td>{beneficiary.bankname}</td>
                    <td>
                    <button className='btn btn-info btns' onClick={() => handleDetails(index)}>View Details</button>
                    <button className='btn btn-primary btns' onClick={() => handleEdit(index)}>Edit</button>
                    <button className='btn btn-danger btns' onClick={() => handleRemove(beneficiary.id)}>Remove</button>
                    </td>
                </tr>
             ))}
        </tbody>
        </table>
        {showModal && 
        <div className="modal" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Beneficiary Details</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setshowModal(false)}></button>
      </div>

      
      <div className="modal-body dataT">
        <section>
        <div><span>Name</span><span>{name}</span></div>
        <div><span>Account Number</span><span>{accountNumber}</span></div>
        <div><span>Bank Name</span><span>{bankname}</span></div>
        <div><span>Type Of Account</span><span>{accounttype}</span></div>
        </section>
      </div>

      
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => setshowModal(false)}>Ok</button>
      </div>

    </div>
  </div>
</div> }
{showModalNotify && 
        <div className="modal" id="myModalNotify">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-body">
        <p className='text-center'>Beneficiary List Updated Successfully!!!</p>
      </div>
    </div>
  </div>
</div> }
{showModalAdd && 
        <div className="modal" id="myModalAdd">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Add Confirmation</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setshowModalEdit(false)}></button>
      </div>

      
      <div className="modal-body">
        <p>Are you sure to add the beneficiary details?</p>
      </div>

      
      <div className="modal-footer">
      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addDetails}>Yes</button>
        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setshowModalAdd(false)}>No</button>
      </div>

    </div>
  </div>
</div> }
{showModalEdit && 
        <div className="modal" id="myModalEdit">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Edit Confirmation</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setshowModalEdit(false)}></button>
      </div>

      
      <div className="modal-body">
        <p>Are you sure to update the beneficiary details?</p>
      </div>

      
      <div className="modal-footer">
      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateDetails}>Yes</button>
        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setshowModalEdit(false)}>No</button>
      </div>

    </div>
  </div>
</div> }
{showModalRemove && 
        <div className="modal" id="myModalRemove">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Remove Confirmation</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setshowModalRemove(false)}></button>
      </div>

      
      <div className="modal-body">
        <p>Are you sure to remove the beneficiary details?</p>
      </div>

      
      <div className="modal-footer">
      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={removeDetails}>Yes</button>
        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setshowModalRemove(false)}>No</button>
      </div>

    </div>
  </div>
</div> }
    </div>
  );
};

export default AddBeneficiaryForm;
