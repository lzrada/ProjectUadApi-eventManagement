"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Settings, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Layout, 
  Box 
} from 'lucide-react';

const DashboardSewaGedung = () => {
  const [bulanIni, setBulanIni] = useState(new Date());
  
  // Data contoh gedung yang sudah disewa
  const tanggalTersewa = [
    {
      tanggal: "2024-12-10",
      namaPenyewa: "PT. ABC",
      durasi: 1,
      harga: 5000000
    },
    {
      tanggal: "2024-12-15",
      namaPenyewa: "PT. XYZ",
      durasi: 2,
      harga: 10000000
    },
    {
      tanggal: "2024-12-20",
      namaPenyewa: "CV. DEF",
      durasi: 1,
      harga: 5000000
    }
  ];

  const jumlahHariDalamBulan = (tanggal) => {
    return new Date(tanggal.getFullYear(), tanggal.getMonth() + 1, 0).getDate();
  };

  const hariPertamaBulan = (tanggal) => {
    return new Date(tanggal.getFullYear(), tanggal.getMonth(), 1).getDay();
  };

  const sudahDisewa = (tanggal) => {
  const tanggalString = tanggal.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
  return tanggalTersewa.some(sewa => sewa.tanggal === tanggalString);
};

const getInfoSewa = (tanggal) => {
  const tanggalString = tanggal.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
  return tanggalTersewa.find(sewa => sewa.tanggal === tanggalString);
};


  const handleKlikTanggal = (tanggal) => {
    const infoSewa = getInfoSewa(tanggal);
    if (infoSewa) {
      alert(`
        Tanggal: ${infoSewa.tanggal}
        Penyewa: ${infoSewa.namaPenyewa}
        Durasi: ${infoSewa.durasi} hari
        Harga: Rp ${infoSewa.harga.toLocaleString('id-ID')}
      `);
    } else {
      alert(`Tanggal ${tanggal.toLocaleDateString('id-ID')} tersedia untuk disewa`);
    }
  };

  const bulanBerikutnya = () => {
    setBulanIni(new Date(bulanIni.getFullYear(), bulanIni.getMonth() + 1));
  };

  const bulanSebelumnya = () => {
    setBulanIni(new Date(bulanIni.getFullYear(), bulanIni.getMonth() - 1));
  };

  const menuItems = [
    { icon: Layout, text: 'Dashboard' },
    { icon: MessageSquare, text: 'Pesan' },
    { icon: CalendarIcon, text: 'Kalender' },
    { icon: Box, text: 'Daftar Gedung' },
    { icon: Settings, text: 'Pengaturan' },
    { icon: LogOut, text: 'Keluar' }
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-pink-400 p-6 text-white">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-white/20" />
          <span className="font-semibold">Sewa Gedung</span>
        </div>
        
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <Button 
              key={index}
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-pink-500"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.text}
            </Button>
          ))}
        </nav>
      </div>

      {/* Konten Utama */}
      <div className="flex-1 p-8">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Kalender Sewa Gedung</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={bulanSebelumnya}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {bulanIni.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
              </span>
              <Button variant="outline" size="icon" onClick={bulanBerikutnya}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((hari) => (
                <div key={hari} className="text-center font-medium p-2">
                  {hari}
                </div>
              ))}
              
              {Array.from({ length: hariPertamaBulan(bulanIni) }).map((_, index) => (
                <div key={`kosong-${index}`} className="p-2" />
              ))}
              
              {Array.from({ length: jumlahHariDalamBulan(bulanIni) }).map((_, index) => {
                const tanggal = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), index + 1);
                const tersewa = sudahDisewa(tanggal);
                
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-12 ${
                      tersewa 
                        ? 'bg-gray-200 hover:bg-gray-300 cursor-not-allowed' 
                        : 'bg-blue-100 hover:bg-blue-200'
                    }`}
                    disabled={tersewa}
                    onClick={() => handleKlikTanggal(tanggal)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSewaGedung;