// src/app/components/ui/card.js

export function Card({ children }) {
    return <div className="bg-white shadow-md rounded-lg p-4">{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="text-lg font-bold">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <div className="text-xl font-semibold">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="mt-2">{children}</div>;
  }
  