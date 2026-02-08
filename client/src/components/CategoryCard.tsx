import React from 'react';

interface CategoryCardProps {
  name: string;
  subtext: string;
  icon: string;
  onClick: () => void;
}

// Map category icons to real Unsplash images
const categoryImages: { [key: string]: string } = {
  'kirana': 'https://images.unsplash.com/photo-1739066598279-1297113f5c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MXx8fHwxNzY4OTMxNTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'medical': 'https://images.unsplash.com/photo-1550572017-26b5655c1e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcGhhcm1hY3l8ZW58MXx8fHwxNzY4OTMxNTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'bakery': 'https://images.unsplash.com/photo-1674770067314-296af21ad811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZHxlbnwxfHx8fDE3Njg4OTgxODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'sweet': 'https://images.unsplash.com/photo-1695568180070-8b5acead5cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzd2VldHN8ZW58MXx8fHwxNzY4OTMxNTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'meat': 'https://images.unsplash.com/photo-1634932515818-7f9292c4e149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBmaXNofGVufDF8fHx8MTc2ODkzMTUyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  'fruits': 'https://images.unsplash.com/photo-1595303477117-8dddd2894299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmcnVpdHN8ZW58MXx8fHwxNzY4OTMxNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'dairy': 'https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3Njg4OTExODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'stationery': 'https://images.unsplash.com/photo-1561865406-62a037159577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGF0aW9uZXJ5JTIwc3VwcGxpZXN8ZW58MXx8fHwxNzY4ODQ2NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'mobile': 'https://images.unsplash.com/photo-1611396000732-f8c9a933424f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMHJlcGFpcnxlbnwxfHx8fDE3Njg5MzE1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'electrician': 'https://images.unsplash.com/photo-1661338148448-c12887abcd47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHRvb2xzfGVufDF8fHx8MTc2ODkzMTUyOXww&ixlib=rb-4.1.0&q=80&w=1080',
  'plumber': 'https://images.unsplash.com/photo-1654440122140-f1fc995ddb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwdG9vbHN8ZW58MXx8fHwxNzY4OTMxNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'salon': 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb258ZW58MXx8fHwxNzY4OTMwMDQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'laundry': 'https://images.unsplash.com/photo-1635274605638-d44babc08a4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXVuZHJ5JTIwc2VydmljZXxlbnwxfHx8fDE3Njg5MzE1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'hardware': 'https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzfGVufDF8fHx8MTc2ODkzMTUzMHww&ixlib=rb-4.1.0&q=80&w=1080',
  'pooja': 'https://images.unsplash.com/photo-1653227907864-560dce4c252d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb29qYSUyMGl0ZW1zfGVufDF8fHx8MTc2ODkzMTUzMHww&ixlib=rb-4.1.0&q=80&w=1080',
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, subtext, icon, onClick }) => {
  const imageUrl = categoryImages[icon];

  return (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#FF9933] transition-all hover:shadow-lg"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white font-semibold text-sm md:text-base mb-1 text-left">
          {name}
        </h3>
        <p className="text-white/90 text-xs text-left">
          {subtext}
        </p>
      </div>
    </button>
  );
};
