export const BrandLogo = ({ subtitle }: { subtitle?: string }) => {
  return (
    <div>
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
              <span className="text-[#FF9933]">स्वदेशी</span> Mart
            </h1>
      {subtitle && (
        <p className="text-[10px] text-gray-500 -mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};
