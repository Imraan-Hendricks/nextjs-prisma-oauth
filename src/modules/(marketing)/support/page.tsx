import MarketingLayout from '../layout';
import { Contact } from './Contact';
import { CustomHead } from '@/components/CustomHead';
import { useNavbar } from '@/modules/common/NavbarContext';

export default function Support() {
  useNavbar('/support');

  return (
    <MarketingLayout>
      <CustomHead title='Support' />
      <Contact />
    </MarketingLayout>
  );
}
