/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemHeader,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

import { Textarea } from '@/components/ui/textarea';

import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useRouter } from 'next/navigation';
import {
  IconArrowNarrowLeft,
  IconDeviceFloppy,
  IconInfoSquare,
  IconSquareCheck,
} from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

function page() {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date('2025-06-01'));
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState<string | number>(formatDate(date));
  const router = useRouter();
  const changeHandler = () => {};

  return (
    <div>
      {/* center div */}
      <div className="mx-auto w-[87%]">
        <div className="flex items-center w-full justify-between py-5 flex-wrap">
          <div>
            <h1 className="font-extrabold text-3xl text-gray-800">Pre-Shipment Inspection (PSI)</h1>
            <p className="text-sm text-gray-600 my-1 font-medium">
              Inspection ID: INS-2025-001 • B/L: MEDUCN08830b
            </p>
          </div>
          <div className="flex gap-4 py-3">
            <Button
              variant="outline"
              className="bg-white text-[0.92rem] rounded-md px-3 py-2 font-bold outline hover:cursor-pointer"
              onClick={() => router.push('/')}
            >
              <span>
                <IconArrowNarrowLeft />
              </span>{' '}
              Back to Dashboard
            </Button>
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white text-[0.92rem] rounded-md px-3 py-2 font-bold hover:cursor-pointer"
              onClick={() => alert('✅ Inspection saved as draft successfully!')}
            >
              <span>
                <IconDeviceFloppy />
              </span>{' '}
              Save Progress
            </Button>
          </div>
        </div>

        {/* form div */}
        <div className="flex flex-nowrap gap-4.5 mt-4.5 md:flex-wrap mid-w-[20%] max-lg:block">
          {/* left section */}
          <section className="flex flex-col gap-4.5 flex-5">
            <Item variant="outline">
              <ItemContent className="flex flex-row items-center gap-3">
                <span>
                  <IconInfoSquare />
                </span>
                <div>
                  <ItemTitle>Inspection Guidelines</ItemTitle>
                  <ItemDescription>
                    Samples must be drawn at random from 10% of bags. All measurements should be
                    recorded accurately as per RBS Maritime Services standards.
                  </ItemDescription>
                </div>
              </ItemContent>
            </Item>
            <Card className="flex-1 bg-card">
              <CardHeader className="flex justify-between items-center-safe border-b">
                <CardTitle className="font-bold">Shipment Information</CardTitle>
                <p className="text-xs bg-orange-100 text-orange-800 font-bold rounded-md px-2 py-0.5">
                  Sampling Required
                </p>
              </CardHeader>
              <CardContent className="grid grid-flow-row grid-cols-2 gap-4">
                <div>
                  <div className="pb-1.5">
                    <Label htmlFor="cargo" className="text-sm font-bold text-gray-800">
                      Cargo
                    </Label>
                  </div>
                  <InputGroup>
                    <InputGroupInput placeholder="Raw Cashew Nuts with Shell" id="cargo" />
                  </InputGroup>
                </div>
                <div>
                  <div className="pb-1.5">
                    <Label htmlFor="seller" className="text-sm font-bold text-gray-800">
                      Seller
                    </Label>
                  </div>
                  <InputGroup>
                    <InputGroupInput placeholder="M/S RMT Nuts" id="seller" />
                  </InputGroup>
                </div>
                <div>
                  <div className="pb-1.5">
                    <Label htmlFor="buyer" className="text-sm font-bold text-gray-800">
                      Buyer
                    </Label>
                  </div>
                  <InputGroup>
                    <InputGroupInput placeholder="M/S Shree Balaji Cashew" id="buyer" />
                  </InputGroup>
                </div>
                <div>
                  <div className="pb-1.5">
                    <Label htmlFor="origin" className="text-sm font-bold text-gray-800">
                      Origin
                    </Label>
                  </div>
                  <InputGroup>
                    <InputGroupInput placeholder="Guinea" id="origin" />
                  </InputGroup>
                </div>
                <div>
                  <div className="pb-1.5">
                    <Label htmlFor="bl_num" className="text-sm font-bold text-gray-800">
                      B/L Number
                    </Label>
                  </div>
                  <InputGroup>
                    <InputGroupInput placeholder="MEDUCN08830b" id="bl_num" />
                  </InputGroup>
                </div>
                <div>
                  <div className="pb-1.5">
                    <Label htmlFor="bl_quan" className="text-sm font-bold text-gray-800">
                      B/L Quantity
                    </Label>
                  </div>
                  <InputGroup>
                    <InputGroupInput placeholder="4x40' Containers" id="bl_quan" />
                  </InputGroup>
                </div>
              </CardContent>
              <CardFooter className="grid grid-flow-row grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h1 className="font-bold mb-1.5">Sampling Details</h1>
                  <hr className="pb-2" />
                  <Item variant="outline">
                    <ItemContent className="flex flex-row items-center gap-3">
                      <span>Icon</span>
                      <div>
                        <ItemDescription>
                          Samples were drawn at random from 10% of the bags and subjected to cutting
                          test
                        </ItemDescription>
                      </div>
                    </ItemContent>
                  </Item>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="cutting_date" className="text-sm font-bold text-gray-800">
                    Date Of Sampling
                  </Label>
                  <div className="relative flex gap-2">
                    <InputGroupInput
                      id="cutting_date"
                      value={value}
                      placeholder="June 01, 2025"
                      className="bg-background pr-10 rounded-sm"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setValue(e.target.value);
                        if (isValidDate(date)) {
                          setDate(date);
                          setMonth(date);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setOpen(true);
                        }
                      }}
                    />
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-picker"
                          variant="ghost"
                          className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                          <CalendarIcon className="size-3.5" />
                          <span className="sr-only">Select date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <div className="pb-1.5">
                    <Label htmlFor="bl_quan" className="text-sm font-bold text-gray-800">
                      Place of Sampling
                    </Label>
                  </div>
                  <InputGroup>
                    <InputGroupInput
                      value="Nallamalai, G/D, Tuticorin"
                      id="bl_quan"
                      className="bg-background pr-10"
                      onChange={changeHandler}
                    />
                  </InputGroup>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date" className="text-sm font-bold text-gray-800">
                    Date Of Cutting Test
                  </Label>
                  <div className="relative flex gap-2">
                    <InputGroupInput
                      id="date"
                      value={value}
                      placeholder="June 01, 2025"
                      className="bg-background pr-10 rounded-sm"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setValue(e.target.value);
                        if (isValidDate(date)) {
                          setDate(date);
                          setMonth(date);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setOpen(true);
                        }
                      }}
                    />
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-picker"
                          variant="ghost"
                          className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                          <CalendarIcon className="size-3.5" />
                          <span className="sr-only">Select date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <div className="pb-1.5">
                    <Label htmlFor="bl_quan" className="text-sm font-bold text-gray-800">
                      Place of Cutting Test
                    </Label>
                  </div>
                  <InputGroup>
                    <InputGroupInput
                      value="RBS Lab, Tuticorin"
                      id="bl_quan"
                      className="bg-background pr-10"
                      onChange={changeHandler}
                    />
                  </InputGroup>
                </div>
              </CardFooter>
            </Card>
            <Card className="flex-1 bg-card">
              <CardHeader className="flex justify-between items-center-safe border-b">
                <CardTitle className="font-bold">Cutting Test Results</CardTitle>
                <p className="text-xs font-bold">5 Samples Required</p>
              </CardHeader>
              <CardContent>
                <div className="flex w-full flex-col gap-6">
                  <Tabs defaultValue="s1">
                    <TabsList className="w-full bg-white">
                      <TabsTrigger
                        value="s1"
                        className="border-b-2  border-b-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-b-none data-[state=active]:border-b-green-500 data-[state=active]:text-green-600 font-bold hover:cursor-pointer pb-4"
                      >
                        Sample 1
                      </TabsTrigger>
                      <TabsTrigger
                        value="s2"
                        className="border-b-2  border-b-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-b-none data-[state=active]:border-b-green-500 data-[state=active]:text-green-600 font-bold hover:cursor-pointer pb-4"
                      >
                        Sample 2
                      </TabsTrigger>
                      <TabsTrigger
                        value="s3"
                        className="border-b-2  border-b-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-b-none data-[state=active]:border-b-green-500 data-[state=active]:text-green-600 font-bold hover:cursor-pointer pb-4"
                      >
                        Sample 3
                      </TabsTrigger>
                      <TabsTrigger
                        value="s4"
                        className="border-b-2  border-b-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-b-none data-[state=active]:border-b-green-500 data-[state=active]:text-green-600 font-bold hover:cursor-pointer pb-4"
                      >
                        Sample 4
                      </TabsTrigger>
                      <TabsTrigger
                        value="s5"
                        className="border-b-2  border-b-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-b-none data-[state=active]:border-b-green-500 data-[state=active]:text-green-600 font-bold hover:cursor-pointer pb-4"
                      >
                        Sample 5
                      </TabsTrigger>
                      <TabsTrigger
                        value="avg"
                        className="border-b-2 border-b-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-b-none data-[state=active]:border-b-green-500 data-[state=active]:text-green-600 font-bold hover:cursor-pointer pb-4"
                      >
                        Average
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="s1">
                      <div className="text-sm font-bold w-full">
                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 bg-blue-50 items-center-safe justify-between px-2 [&>p]:text-[0.8rem] [&>p]:text-gray-600 ">
                          <p>PARAMETER</p>
                          <p>STANDARD/LIMIT</p>
                          <p>MEASURED VALUE</p>
                          <p>STATUS</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Count (per kg)</p>
                          <p>Max 190/kg</p>
                          <Input placeholder="184" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Full Damage + Void Nuts (gm)</p>
                          <p>Max 150 gm</p>
                          <Input placeholder="124.260" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Oil Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="0" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Immature/Spotted Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="57.486" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Sound Kernel (gm)</p>
                          <p>Min 200 gm</p>
                          <Input placeholder="258.134" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Partly Sound Kernels (gm)</p>
                          <p>-</p>
                          <Input placeholder="17.278" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Total Yield (gm)</p>
                          <p>Min 240 gm</p>
                          <Input placeholder="266.773" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Outturn (LBS per 80 kg)</p>
                          <p>Min 45 LBS</p>
                          <Input placeholder="47.05" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="s2">
                      <div className="text-sm font-bold w-full">
                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 bg-blue-50 items-center-safe justify-between px-2 [&>p]:text-[0.8rem] [&>p]:text-gray-600 ">
                          <p>PARAMETER</p>
                          <p>STANDARD/LIMIT</p>
                          <p>MEASURED VALUE</p>
                          <p>STATUS</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Count (per kg)</p>
                          <p>Max 190/kg</p>
                          <Input placeholder="181" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Full Damage + Void Nuts (gm)</p>
                          <p>Max 150 gm</p>
                          <Input placeholder="148.960" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Oil Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="0" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Immature/Spotted Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="43.600" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Sound Kernel (gm)</p>
                          <p>Min 200 gm</p>
                          <Input placeholder="249.380" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Partly Sound Kernels (gm)</p>
                          <p>-</p>
                          <Input placeholder="14.660" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Total Yield (gm)</p>
                          <p>Min 240 gm</p>
                          <Input placeholder="256.820" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Outturn (LBS per 80 kg)</p>
                          <p>Min 45 LBS</p>
                          <Input placeholder="45.26" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="s3">
                      <div className="text-sm font-bold w-full">
                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 bg-blue-50 items-center-safe justify-between px-2 [&>p]:text-[0.8rem] [&>p]:text-gray-600 ">
                          <p>PARAMETER</p>
                          <p>STANDARD/LIMIT</p>
                          <p>MEASURED VALUE</p>
                          <p>STATUS</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Count (per kg)</p>
                          <p>Max 190/kg</p>
                          <Input placeholder="183" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Full Damage + Void Nuts (gm)</p>
                          <p>Max 150 gm</p>
                          <Input placeholder="66.290" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Oil Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="4.880" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Immature/Spotted Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="48.510" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Sound Kernel (gm)</p>
                          <p>Min 200 gm</p>
                          <Input placeholder="257.060" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Partly Sound Kernels (gm)</p>
                          <p>-</p>
                          <Input placeholder="15.150" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Total Yield (gm)</p>
                          <p>Min 240 gm</p>
                          <Input placeholder="269.980" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Outturn (LBS per 80 kg)</p>
                          <p>Min 45 LBS</p>
                          <Input placeholder="50.17" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="s4">
                      <div className="text-sm font-bold w-full">
                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 bg-blue-50 items-center-safe justify-between px-2 [&>p]:text-[0.8rem] [&>p]:text-gray-600 ">
                          <p>PARAMETER</p>
                          <p>STANDARD/LIMIT</p>
                          <p>MEASURED VALUE</p>
                          <p>STATUS</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Count (per kg)</p>
                          <p>Max 190/kg</p>
                          <Input placeholder="189" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Full Damage + Void Nuts (gm)</p>
                          <p>Max 150 gm</p>
                          <Input placeholder="97.640" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Oil Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="0" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Immature/Spotted Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="27.480" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Sound Kernel (gm)</p>
                          <p>Min 200 gm</p>
                          <Input placeholder="245.340" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Partly Sound Kernels (gm)</p>
                          <p>-</p>
                          <Input placeholder="17.040" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Total Yield (gm)</p>
                          <p>Min 240 gm</p>
                          <Input placeholder="254.850" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Outturn (LBS per 80 kg)</p>
                          <p>Min 45 LBS</p>
                          <Input placeholder="44.96" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="s5">
                      <div className="text-sm font-bold w-full">
                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 bg-blue-50 items-center-safe justify-between px-2 [&>p]:text-[0.8rem] [&>p]:text-gray-600 ">
                          <p>PARAMETER</p>
                          <p>STANDARD/LIMIT</p>
                          <p>MEASURED VALUE</p>
                          <p>STATUS</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Count (per kg)</p>
                          <p>Max 190/kg</p>
                          <Input placeholder="168" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Full Damage + Void Nuts (gm)</p>
                          <p>Max 150 gm</p>
                          <Input placeholder="126.400" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Oil Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="0" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Immature/Spotted Nuts (gm)</p>
                          <p>-</p>
                          <Input placeholder="42.158" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Sound Kernel (gm)</p>
                          <p>Min 200 gm</p>
                          <Input placeholder="258.134" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Partly Sound Kernels (gm)</p>
                          <p>-</p>
                          <Input placeholder="13.654" className="text-right w-24 h-fit" />
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Total Yield (gm)</p>
                          <p>Min 240 gm</p>
                          <Input placeholder="266.773" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p>Outturn (LBS per 80 kg)</p>
                          <p>Min 45 LBS</p>
                          <Input placeholder="47.37" className="text-right w-24 h-fit" />
                          <p className="text-green-600">pass</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="avg">
                      <Item variant="outline" className="mb-4 bg-green-50">
                        <ItemContent className="flex flex-row items-center gap-3">
                          <span>
                            <IconSquareCheck />
                          </span>
                          <div>
                            <ItemTitle className="font-bold">
                              Average Results - All Parameters Pass
                            </ItemTitle>
                            <ItemDescription>
                              The average cutting test results meet all quality standards for RCN
                              W320 Guinea origin.
                            </ItemDescription>
                          </div>
                        </ItemContent>
                      </Item>
                      <div className="text-sm font-bold w-full">
                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 bg-blue-50 items-center-safe justify-between px-2 [&>p]:text-[0.8rem] [&>p]:text-gray-600 ">
                          <p>PARAMETER</p>
                          <p>STANDARD/LIMIT</p>
                          <p>MEASURED VALUE</p>
                          <p>STATUS</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p className="font-bold">Average Count (per kg)</p>
                          <p>Max 190/kg</p>
                          <p className="font-bold">180</p>
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p className="font-bold">Average Damage + Void Nuts (gm)</p>
                          <p>Max 150 gm</p>
                          <p className="font-bold">120.76</p>
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p className="font-bold">Average Immature/Spotted Nuts (gm)</p>
                          <p>-</p>
                          <p className="font-bold">57.486</p>
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p className="font-bold">Average Sound Kernel (gm)</p>
                          <p>Min 200 gm</p>
                          <p className="font-bold">258.134</p>
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p className="font-bold">Average Sound Kernels (gm)</p>
                          <p>-</p>
                          <p className="font-bold">17.278</p>
                          <p>-</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p className="font-bold">Average Total Yield (gm)</p>
                          <p>Min 240 gm</p>
                          <p className="font-bold">266.773</p>
                          <p className="text-green-600">pass</p>
                        </div>

                        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-4 border-b py-3 items-center-safe justify-between px-2 [&>p]:text-[0.8rem]">
                          <p className="font-bold">Average Outturn (LBS per 80 kg)</p>
                          <p>Min 45 LBS</p>
                          <p className="font-bold">47.05</p>
                          <p className="text-green-600">pass</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 bg-card">
              <CardHeader className="flex justify-between items-center-safe border-b">
                <CardTitle className="font-bold">Inspection Photos</CardTitle>
                <p className="text-xs font-bold">Upload Evidence</p>
              </CardHeader>
              <CardContent className="flex justify-between">
                <p className="w-[30%] outline-2 outline-offset-2 outline-dashed text-center p-15 bg-blue-50 rounded-md">
                  Sample Bags
                </p>
                <p className="w-[30%] outline-2 outline-offset-2 outline-dashed text-center p-15 bg-blue-50 rounded-md">
                  Cutting Test
                </p>
                <p className="w-[30%] outline-2 outline-offset-2 outline-dashed text-center p-15 bg-blue-50 rounded-md">
                  Quality Check
                </p>
              </CardContent>
            </Card>
            <Card className="flex-1 bg-card">
              <CardHeader className="flex justify-between items-center-safe border-b">
                <CardTitle className="font-bold">Inspector Notes & Remarks</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h1 className="text-sm font-bold pb-2">Observations</h1>
                  <InputGroup>
                    <Textarea
                      data-slot="input-group-control"
                      className="dark:bg-input/30 flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none"
                      placeholder="Good quality cashew nuts. All samples meet the required standards. No major defects observed."
                    />
                  </InputGroup>
                </div>
                <div>
                  <h1 className="text-sm font-bold pb-2">Recommendations</h1>
                  <InputGroup>
                    <Textarea
                      data-slot="input-group-control"
                      className="dark:bg-input/30 flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none"
                      placeholder="Approve shipment for delivery. Quality standards met as per contract specifications."
                    />
                  </InputGroup>
                </div>
              </CardContent>
            </Card>
            <hr />
            <div className="flex justify-end-safe gap-2">
              <Button variant="outline" className="bg-white">
                Cancel
              </Button>
              <Button variant="outline" className="bg-white">
                Save
              </Button>
              <Button variant="outline" className="bg-green-600 text-white">
                Submit Inspection Report
              </Button>
            </div>
          </section>

          {/* right section */}
          <section className="flex flex-col gap-4.5 flex-2 max-lg:mt-4.5">
            <Card>
              <CardHeader className="border-b flex flex-col">
                <CardTitle>Inspection Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="m-2 px-4 py-4.5 bg-blue-50 border rounded-md">
                  <div className="flex justify-between border-b pb-1">
                    <p className="text-sm font-bold text-gray-500">Status</p>
                    <p className="text-orange-600 font-bold">In Progress</p>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <p className="text-sm font-bold text-gray-500">Completion</p>
                    <p className="font-semibold text-[0.96rem] text-gray-800">85%</p>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <p className="text-sm font-bold text-gray-500">Samples Tested</p>
                    <p className="font-semibold text-[0.96rem] text-gray-800">5 of 5</p>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <p className="text-sm font-bold text-gray-500">Overall Result</p>
                    <p className="font-semibold text-[0.96rem] text-green-600">Pass</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="border-b flex flex-col">
                <CardTitle>Quality Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="text-[0.9rem] font-bold">RCN W320 Standards:</h1>
                <ul className="text-[0.9rem] text-gray-600 list-disc list-inside">
                  <li>Count: Max 190/kg</li>
                  <li>Outturn: Min 45 LBS</li>
                  <li>Moisture: Max 8%</li>
                  <li>Defects: Max 5%</li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-xs bg-green-100 text-green-800 font-bold rounded-md px-3 py-1">
                  All Standards Met
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="border-b flex flex-col">
                <CardTitle>Weighment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="containers" className="text-sm font-bold text-gray-800">
                    Containers
                  </Label>
                  <InputGroup>
                    <InputGroupInput
                      value="4x40'"
                      id="containers"
                      className="bg-background pr-10"
                      onChange={changeHandler}
                    />
                  </InputGroup>
                  <Label htmlFor="no_bags" className="text-sm font-bold text-gray-800">
                    No. of Bags
                  </Label>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Enter total bags"
                      id="no_bags"
                      className="bg-background pr-10"
                    />
                  </InputGroup>
                  <Label htmlFor="gross_weight" className="text-sm font-bold text-gray-800">
                    Gross Weight (MT)
                  </Label>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Enter gross weight"
                      id="gross_weight"
                      className="bg-background pr-10"
                    />
                  </InputGroup>
                  <Label htmlFor="dunnage" className="text-sm font-bold text-gray-800">
                    Dunnage (kg/ctr)
                  </Label>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Enter dunnage"
                      id="dunnage"
                      className="bg-background pr-10"
                    />
                  </InputGroup>
                  <Label htmlFor="net_weight" className="text-sm font-bold text-gray-800">
                    Net Weight (MT)
                  </Label>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Calculated net weight"
                      id="net_weight"
                      className="bg-background pr-10"
                    />
                  </InputGroup>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="border-b flex flex-col">
                <CardTitle>Inspection Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="m-2 px-4 py-4.5 bg-blue-50 border rounded-md">
                  <div className="flex justify-between border-b pb-1">
                    <p className="text-sm font-bold text-gray-500">Name</p>
                    <p className="text-gray-800 text-[0.96rem] font-bold">Ramachandra</p>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <p className="text-sm font-bold text-gray-500">License</p>
                    <p className="font-semibold text-[0.96rem] text-gray-800">RBS-QC-2024-089</p>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <p className="text-sm font-bold text-gray-500">Location</p>
                    <p className="font-semibold text-[0.96rem] text-gray-800">Tuticorin port</p>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <p className="text-sm font-bold text-gray-500">Date</p>
                    <p className="font-semibold text-[0.96rem] text-gray-800">Oct 15, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

export default page;
