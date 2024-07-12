'use client';

import ProductCard from '@/components/product-card/product-card';
import ProductsContainer from '@/components/product-card/products-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { useProducts } from '@/sdk/queries/products.client';
import { IProduct } from '@/types/product.types';
import { ArrowLeftIcon, ScanSearchIcon, SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const { getProducts, products, loading } = useProducts();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        !!search &&
        getProducts({
          variables: {
            searchValue: search,
            perPage: 20,
            isKiosk: true,
            hasSimilarity: 'config',
          },
        }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [search, getProducts]);

  return (
    <div className="container py-4">
      <div className="fixed flex items-center top-0 p-2 left-0 w-full bg-primary gap-1">
        <Button
          variant="ghost"
          className="flex-none hover:bg-white/10 text-primary-foreground hover:text-primary-foreground -ml-1"
          size="icon"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <div className="relative flex-1">
          <Input
            className="bg-white w-full pl-8"
            placeholder="Хайлтын утгаа оруулана уу"
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 h-5 w-5 text-neutral-600" />
        </div>
      </div>
      <div className="min-h-screen py-4">
        {loading && <Loading className="py-32" />}
        {!products?.length && !loading && (
          <div className="py-32 text-sm text-neutral-600 flex flex-col items-center gap-2">
            <ScanSearchIcon
              className="h-12 w-12 text-neutral-500"
              strokeWidth={1.2}
            />
            <span className="pb-32">
              {search
                ? 'Хайлтын үр дүн олдсонгүй'
                : 'Хайлтын утгаа оруулана уу...'}
            </span>
          </div>
        )}
        {!!search && products?.length > 0 && (
          <ProductsContainer>
            {products.map((product: IProduct) => (
              <ProductCard {...product} key={product._id} />
            ))}
          </ProductsContainer>
        )}
      </div>
    </div>
  );
};

export default Search;
