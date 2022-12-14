import clock from '@/assets/icons/gray-clock.svg'
import logo from '@/assets/icons/logo.png'
import mail from '@/assets/icons/mail.svg'
import phone from '@/assets/icons/phone.svg'
import github from '@/assets/icons/socials/gh.svg'
import linked from '@/assets/icons/socials/in.svg'
import inst from '@/assets/icons/socials/inst.svg'

const Footer = () => {
  return (
    <footer className="footer padded-section py-10 text-white bg-header-gray">
      <div className="footer-wrapper padded-section flex justify-between">
        <div className="socials-container flex-0 basis-54">
          <div className="logo-container flex gap-3 items-center pb-5">
            <img src={logo} alt="LOGO HERE" className="logo max-h-9" />
            <span className="logo-text tracking-wide size text-lg">
              KEYBOARD SHOP
            </span>
          </div>
          <div className="socials-wrap flex justify-between pb-5">
            <a href="">
              <img src={github} alt="Social github" />
            </a>
            <a href="">
              <img src={linked} alt="Social linked in" />
            </a>
            <a href="">
              <img src={inst} alt="Social instagram" />
            </a>
          </div>
          <span className="corypright block">KEYBOARD SHOP 2022</span>
        </div>
        <div className="contacts">
          <h3 className="contacts-title uppercase mb-2 tracking-wide text-lg">
            Contacts
          </h3>
          <ul className="contacts-list text-second-text-color">
            <li className="py-2">
              <a href="#" className="flex items-center gap-3">
                <img src={clock} className="w-6" alt="contact logo" />
                <span className="text-white text-sm">
                  Every day from 10:00 to 6:00
                </span>
              </a>
            </li>
            <li className="py-2">
              <a
                href="mailto:youngwwad@gmail.com"
                className="flex items-center gap-3"
              >
                <img src={mail} className="w-6" alt="contact logo" />
                <span className="text-white text-sm">youngwwad@gmail.com</span>
              </a>
            </li>
            <li className="py-2">
              <a href="" className="flex items-center gap-3">
                <img src={phone} className="w-6" alt="contact logo" />
                <span className="text-white text-sm">+38 066 707 552</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
