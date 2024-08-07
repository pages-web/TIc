'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const CategoryFilter = () => {
  const sort = useSearchParams().get('sort');
  const order = useSearchParams().get('order');
  const router = useRouter();

  return (
    <div>
      <span className="block py-2 px-4 mb-4 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest lg:rounded-md">
        Эрэмблэх
      </span>
      <Select
        defaultValue={'newToOld'}
        value={sort || 'newToOld'}
        onValueChange={(val) =>
          router.push(`/category?sort=${val}&order=${order}`)
        }
      >
        <SelectTrigger className="w-full h-11">
          <SelectValue placeholder="Эрэмблэх" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newToOld">Шинэ нь эхэндээ</SelectItem>
          <SelectItem value="oldToNew">Хуучин нь эхэндээ</SelectItem>
          <SelectItem value="priceUp">Үнэ өсөхөөр</SelectItem>
          <SelectItem value="priceDown">Үнэ буурахаар</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
