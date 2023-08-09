"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductType } from "@/interfaces";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
// import ReactStars from 'react-stars';
import { StarIcon } from "@heroicons/react/24/solid";
import CustomImage from "@/components/image";
import { toast } from "react-toastify";
const ProductDetailComponent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [isOpen, setIsOpen] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  
  const router = useRouter();
  async function getData() {
    setLoading(true);
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();
    setProduct(product);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [id]);
  const handleClick = () => {
    const products: ProductType[] =
      JSON.parse(`${localStorage.getItem("carts")}`) || [];
    const isExistProduct = products.find((p) => p.id === product?.id);
    if (isExistProduct) {
      const updatedData=products.map((p) =>{
        if(p.id===product?.id) {
           return { ...p,quantity: p.quantity+1}
        }
        return p
      })
      localStorage.setItem("carts", JSON.stringify(updatedData));
    } else {
      const data = [...products, {...product,quantity:1}];
      localStorage.setItem("carts", JSON.stringify(data));
    }
    toast.success("Product added to your bag!")
  };
  const onCloseFn = () => {
    setIsOpen(false);
    router.back();
  };
  return (
    <Dialog open={isOpen} onClose={onCloseFn} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
            {loading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin"></div>
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline ">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-sm">${product?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating?.rate}</p>
                      {product?.rating?.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          {Array.from(
                            { length: Math.floor(product?.rating?.rate) },
                            (_, i) => (
                              <StarIcon
                                className="h-4 w-4 text-yellow-500"
                                key={i}
                              />
                            )
                          )}
                          {Array.from(
                            { length: 5 - Math.floor(product?.rating?.rate) },
                            (_, i) => (
                              <StarIconOutline
                                className="h-4 w-4 text-yellow-500"
                                key={i}
                              />
                            )
                          )}
                          {/* <ReactStars value={product.rating.rate} edit={false}/> */}
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline coursor-pointer text-xs">
                        See all {product?.rating?.count} reviews
                      </p>
                    </div>
                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      onClick={handleClick}
                      className="button w-full bg-blue-600 text-white bprder-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full gb-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailComponent;
