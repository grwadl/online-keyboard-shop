import HeaderAndTextBlock from '../HeaderAndTextBlock'
import {
  guarantyText,
  paymentKyivAndRegionText,
  shippingKyivRegionText,
  shippingKyivText,
  shippingOtherCitiesText
} from './mock'

const InfoPanelsList = () => {
  return (
    <>
      <div className="shipping flex flex-wrap justify-between w-full" id="Shipping">
        <HeaderAndTextBlock header="Kyiv" text={shippingKyivText} className="basis-full lg:basis-[47%] my-4" />
        <HeaderAndTextBlock
          header="Kyiv Region"
          text={shippingKyivRegionText}
          className="basis-full lg:basis-[47%] my-4"
        />
        <HeaderAndTextBlock
          header="Other cities"
          text={shippingOtherCitiesText}
          className="basis-full lg:basis-[47%] my-4"
        />
      </div>
      <div className="payment flex flex-wrap justify-between w-full" id="Payment">
        <HeaderAndTextBlock
          header="Kyiv and Kyiv Region"
          text={paymentKyivAndRegionText}
          className="basis-full lg:basis-[47%] my-4"
        />
        <HeaderAndTextBlock
          header="Other cities"
          text={paymentKyivAndRegionText}
          className="basis-full lg:basis-[47%] my-4"
        />
      </div>
      <div className="payment flex flex-wrap justify-between w-full" id="Guaranty">
        <HeaderAndTextBlock header="Guaranty" text={guarantyText} className="basis-full my-4" />
        <HeaderAndTextBlock header="Refund" text={guarantyText} className="basis-full my-4" />
      </div>
    </>
  )
}

export default InfoPanelsList
