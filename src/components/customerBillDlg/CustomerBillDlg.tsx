import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import { Window } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Button } from 'components';
import products from './product.json';
import { DatePicker } from '@progress/kendo-react-dateinputs';
interface IVendorDialogProps {
  onClose: () => void;
  onSubmit: (variables: any) => void;
}
interface IIsOpen {
  billing: boolean;
  payments: boolean;
  credit: boolean;
  terms: boolean;
  vendor: boolean;
  approved: boolean;
}

const regex: any = {
  FID: /^_{7}-_{2}$/,
  MainPhone: /^_{3}-_{3}-_{4}$/,
  OtherPhone: /^_{3}-_{3}-_{4}$/,
  Zip: /^_{5}$/,
};

export const CustomerBillDlg: React.FC<IVendorDialogProps> = ({
  onClose,
  onSubmit,
}) => {
  const { handleSubmit, control, watch, setValue } = useFormContext();
  const handleFormSubmit = handleSubmit(onSubmit);
  const [isOpen, setIsOpen] = useState<IIsOpen>({
    billing: false,
    payments: false,
    credit: false,
    vendor: false,
    terms: false,
    approved: false,
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        name &&
        Object.keys(regex).includes(name) &&
        regex[name].test(value[name])
      ) {
        setValue(name, '');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  // dropdown for account Charge to column
  const DropDownCellChargeTo = () => {
    return (
      <td>
        <DropDownList
          style={{ width: '100%' }}
          value="Test Vendor 1"
          data={['Test Vendor 1', 'Test Vendor 2']}
        />
      </td>
    );
  };

  // dropdown for account column
  const DropDownCellAccount = () => {
    return (
      <td>
        <DropDownList
          style={{ width: '100%' }}
          value="20100"
          data={['20100', '10020']}
        />
      </td>
    );
  };

  return (
    <Window
      title="Bill"
      onClose={onClose}
      resizable={false}
      width={800}
      height={600}
    >
      <Form onSubmit={handleFormSubmit}>
        <Fieldset>
          <VendorWrapper width="23%">
            <span className="titleForAP">A/P</span>
            <Controller
              control={control}
              name="FID"
              render={({ field }) => (
                <DropDownList
                  {...field}
                  value={field.value?.toString()}
                  defaultValue={'20110'}
                  className="dropdown-ap"
                  data={['20110', '20120', '20130', '20140']}
                  onOpen={() =>
                    setIsOpen({
                      ...isOpen,
                      credit: true,
                    })
                  }
                  onClose={() =>
                    setIsOpen({
                      ...isOpen,
                      credit: false,
                    })
                  }
                  iconClassName={
                    isOpen.credit ? 'k-icon k-i-arrow-n' : 'k-icon k-i-arrow-s'
                  }
                />
              )}
            />
          </VendorWrapper>
          <VendorWrapper width="23%">
            <Controller
              control={control}
              name="posting-date"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={
                    typeof field.value === 'string'
                      ? new Date(field.value)
                      : field.value
                  }
                  placeholder="Posting Date"
                  width="150px"
                />
              )}
            />
          </VendorWrapper>
          <VendorWrapper width="50%"></VendorWrapper>
        </Fieldset>
        <div className="container-custom">
          <div className="vendor-container">
            <div>
              <Controller
                control={control}
                name="vendor"
                render={({ field }) => (
                  <DropDownList
                    {...field}
                    value={field.value?.toString()}
                    defaultValue={'Vendor'}
                    className="vendor-dropdown"
                    data={[
                      'Vendor',
                      'Vendor one',
                      'Vendor two',
                      'Vendor three',
                    ]}
                    onOpen={() =>
                      setIsOpen({
                        ...isOpen,
                        vendor: true,
                      })
                    }
                    onClose={() =>
                      setIsOpen({
                        ...isOpen,
                        vendor: false,
                      })
                    }
                    iconClassName={
                      isOpen.vendor
                        ? 'k-icon k-i-arrow-n'
                        : 'k-icon k-i-arrow-s'
                    }
                  />
                )}
              />
            </div>

            <div className="address-custom">
              <span>
                <label>Address</label>
                <label>City, St Zip</label>
              </span>
            </div>
            <div className="memo">
              <Controller
                control={control}
                name="memo"
                render={({ field }) => (
                  <Input {...field} placeholder="Memo" type="number" />
                )}
              />
            </div>
          </div>

          <div className="bill-container">
            <div>
              {' '}
              <Controller
                control={control}
                name="bill-number"
                render={({ field }) => (
                  <Input {...field} placeholder="Bill Number" type="number" />
                )}
              />
            </div>
            <div>
              {' '}
              <Controller
                control={control}
                name="our-reference"
                render={({ field }) => (
                  <Input {...field} placeholder="Our Reference" />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="bill-number"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={
                      typeof field.value === 'string'
                        ? new Date(field.value)
                        : field.value
                    }
                    placeholder="Bill Date"
                    width="150px"
                  />
                )}
              />
            </div>
            <div>
              {' '}
              <Controller
                control={control}
                name="Terms"
                render={({ field }) => (
                  <DropDownList
                    {...field}
                    value={field.value?.toString()}
                    defaultValue={'Terms'}
                    data={['Terms', 'Terms one', 'Terms two', 'Terms three']}
                    onOpen={() =>
                      setIsOpen({
                        ...isOpen,
                        terms: true,
                      })
                    }
                    onClose={() =>
                      setIsOpen({
                        ...isOpen,
                        terms: false,
                      })
                    }
                    iconClassName={
                      isOpen.terms ? 'k-icon k-i-arrow-n' : 'k-icon k-i-arrow-s'
                    }
                  />
                )}
              />
            </div>
          </div>

          <div className="date-container">
            <div>
              <span>
                {' '}
                <label>Due</label>
                <label>12/23/23</label>
              </span>
              <span>
                {' '}
                <label>Total</label>
                <label>10,999.99</label>
              </span>
            </div>
          </div>
        </div>

        <Grid className="tabel-grid" data={products}>
          <GridColumn
            cell={DropDownCellAccount}
            title="Account"
            width="100px"
          />
          <GridColumn
            cell={DropDownCellChargeTo}
            title="Charge to"
            width="200px"
          />
          <GridColumn field="AmountId" title="Amount" width="80px" />
          <GridColumn field="LocId" title="Loc" width="60px" />
          <GridColumn field="RefrenceId" title="Refrence" width="100px" />
          <GridColumn field="MemoId" title="Memo" />
        </Grid>
        <ButtonWrapper>
          <Button  disabled={!isValid} style={{ backgroundColor: '#7E8EB1' }}>Save</Button>
          <Button
            onClick={onClose}
            type="button"
            style={{ backgroundColor: '#418CA6' }}
          >
            Cancel
          </Button>
        </ButtonWrapper>
      </Form>
    </Window>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VendorWrapper = styled.div<{ width: string }>`
  flex-basis: ${(props) => props.width};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 4px;
  align-items: center;
  justify-content: flex-end;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 0 0 0;
  gap: 0.5rem;
  border: none;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  &.address {
    width: 100%;
    @media (min-width: 768px) {
      margin-right: 0;
    }
  }

  &.credit {
    width: 100%;
    @media (min-width: 768px) {
      margin-left: 0;
    }
  }

  legend {
    color: #2c5098;
    font-weight: 600;
  }

  .k-floating-label-container.full-width {
    width: 100%;
  }

  .k-floating-label-container.k-empty > .k-label {
    top: 15.0000000004px;
  }

  .k-floating-label-container {
    padding-top: 10.0000000004px;
    color: rgba(0, 0, 0, 0.6);
  }

  .k-floating-label-container > .k-label,
  .k-floating-label-container > .k-label {
    left: 8px;
    font-size: 12px;
    padding-left: 3px;
    padding-right: 3px;
  }

  .k-floating-label-container:focus-within > .k-label {
    top: 0px;
    left: 8px;
    font-size: 12px;
    padding-left: 3px;
    padding-right: 3px;
  }
`;
