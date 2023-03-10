import BlogLayout from './layout';
import { CustomHead } from '@/components/CustomHead';
import { Posts } from './Posts';
import { useNavbar } from '../common/NavbarContext';

export default function Blog() {
  useNavbar('/blog');

  return (
    <BlogLayout>
      <CustomHead title='Blog' />
      <Posts />
    </BlogLayout>
  );
}
