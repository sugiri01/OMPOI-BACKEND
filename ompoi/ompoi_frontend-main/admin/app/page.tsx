import { AdminTasksList } from './_components/ListItem';
import { StyleClass } from './_components/ListItem';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import Center from './_components/Center';
import WelcomeHeader from './_components/WelcomeHeader';
import TopCard from './_components/TopCard';
import ListCard from './_components/ListCard';
import ItemCard from './_components/ItemCard';
import {
  IconApi,
  IconCubeSend,
  IconDatabase,
  IconDeviceLaptop,
  IconPackage,
  IconReport,
  IconTag,
  IconTir,
  IconUrgent,
  IconUser,
} from '@tabler/icons-react';

const users: Array<AdminTasksList> = [
  {
    key: 1,
    title: '#U00128: John Doe',
    info: 'Role: Seller | Last Login: 5 mins ago',
    status: 'Active',
    controlBtn: 'Manage',
  },
  {
    key: 2,
    title: '#U00055: Jane Smith',
    info: 'Role: Buyer | Last Login: 2 days ago',
    status: 'Active',
    controlBtn: 'Manage',
  },
  {
    key: 3,
    title: '#U00340: Tech Tester',
    info: 'Role: QC Agent | Status: Account Locked',
    status: 'Locked',
    controlBtn: 'Unlock',
  },
  {
    key: 4,
    title: '#U00401: New User',
    info: 'Role: Buyer | Status: Email Verification Pending',
    status: 'Pending',
    controlBtn: 'Verify',
  },
];

const usersStyle: Array<StyleClass> = [
  { statusColor: 'text-green-800', bgStatus: 'bg-green-100', border: 'border-b' },
  { statusColor: 'text-green-800', bgStatus: 'bg-green-100', border: 'border-b' },
  { statusColor: 'text-red-800', bgStatus: 'bg-red-100', border: 'border-b' },
  { statusColor: 'text-orange-800', bgStatus: 'bg-orange-100', border: '' },
];

const operations: Array<AdminTasksList> = [
  {
    key: 1,
    title: '#ORD-9012: Cashew Lot 42',
    info: 'Action: QC Report Approval | Seller: East Africa Traders',
    status: 'Pending QC',
    controlBtn: 'Review',
  },
  {
    key: 2,
    title: '#TXN-1002: $15,000 Payment',
    info: 'Action: High Value Transaction Approval | Buyer: Global Nuts Inc.',
    status: 'Hold',
    controlBtn: 'Approve',
  },
  {
    key: 3,
    title: '#RPT-0048: User Profile Change',
    info: 'Action: Name Change Verification | User: #U00321',
    status: 'Verification',
    controlBtn: 'Verify',
  },
];

const operationsStyle: Array<StyleClass> = [
  { statusColor: 'text-orange-800', bgStatus: 'bg-orange-100', border: 'border-b' },
  { statusColor: 'text-red-800', bgStatus: 'bg-red-100', border: 'border-b' },
  { statusColor: 'text-blue-800', bgStatus: 'bg-blue-100', border: '' },
];

export default function Home() {
  return (
    <div>
      {/* center div */}
      <Center>
        <WelcomeHeader />

        {/* top cards */}
        <div className="flex flex-wrap gap-4.5 justify-between">
          <TopCard
            title="Pending Orders"
            icon={<IconPackage color="#49566c" />}
            data="147"
            info="5% vs last week"
            statusColor="red"
          />
          <TopCard
            title="System Uptime"
            icon={<IconDeviceLaptop />}
            data="99.9%"
            info="0.05% vs last week"
            statusColor="green"
          />
          <TopCard
            title="New Registrations"
            icon={<IconUser />}
            data="25"
            info="12% vs last week"
            statusColor="green"
          />
          <TopCard
            title="Open Support Tickets"
            icon={<IconUrgent />}
            data="7"
            info="2% (High Priority)"
            statusColor="red"
          />
        </div>

        {/* flex container for remaining body */}
        <div className="flex flex-nowrap gap-4.5 mt-4.5 md:flex-wrap mid-w-[20%] max-lg:block">
          {/* container for left section */}
          <section className="flex flex-col gap-4.5 flex-5">
            <ListCard
              title="User & Access Control"
              subTitle="(IT Admin)"
              viewBtn="View All Users"
              list={users}
              style={usersStyle}
            />
            <ListCard
              title="Operations Review Queue"
              subTitle="(Ops Admin)"
              viewBtn="View Full Queue"
              list={operations}
              style={operationsStyle}
            />
          </section>

          {/* container for right section */}
          <section className="flex flex-col gap-4.5 flex-2 max-lg:mt-4.5">
            <ItemCard title="System Status (IT)">
              <Item variant="outline" className="mb-3">
                <ItemHeader className="flex justify-start gap-4">
                  <span>
                    <IconApi />
                  </span>
                  <div>
                    <ItemTitle className="font-bold text-[0.95rem]">API Gateway</ItemTitle>
                    <ItemDescription>Operational. Latency: 50ms</ItemDescription>
                  </div>
                </ItemHeader>
              </Item>
              <Item variant="outline" className="mb-3">
                <ItemHeader className="flex justify-start gap-4">
                  <span>
                    <IconDatabase />
                  </span>
                  <div>
                    <ItemTitle className="font-bold text-[0.95rem]">Database Server</ItemTitle>
                    <ItemDescription>High Load. CPU: 85%</ItemDescription>
                  </div>
                </ItemHeader>
              </Item>
              <Item variant="outline">
                <ItemHeader className="flex justify-start gap-4">
                  <span>
                    <IconTir />
                  </span>
                  <div>
                    <ItemTitle className="font-bold text-[0.95rem]">
                      Logistics Partner Sync
                    </ItemTitle>
                    <ItemDescription>Connection failed 3 hours ago.</ItemDescription>
                  </div>
                </ItemHeader>
              </Item>
            </ItemCard>
            <ItemCard title="Quick Operations Access">
              <Item variant="outline" className="mb-3">
                <ItemHeader className="flex justify-start gap-4">
                  <span>
                    <IconReport />
                  </span>
                  <div>
                    <ItemTitle className="font-bold text-[0.95rem]">Generate Report</ItemTitle>
                    <ItemDescription>Run monthly operational reports.</ItemDescription>
                  </div>
                </ItemHeader>
              </Item>
              <Item variant="outline" className="mb-3">
                <ItemHeader className="flex justify-start gap-4">
                  <span>
                    <IconCubeSend />
                  </span>
                  <div>
                    <ItemTitle className="font-bold text-[0.95rem]">Shipment Tracker</ItemTitle>
                    <ItemDescription>Monitor all active logistics status.</ItemDescription>
                  </div>
                </ItemHeader>
              </Item>
              <Item variant="outline">
                <ItemHeader className="flex justify-start gap-4">
                  <span>
                    <IconTag />
                  </span>
                  <div>
                    <ItemTitle className="font-bold text-[0.95rem]">
                      Manage Product Catalog
                    </ItemTitle>
                    <ItemDescription>Update pricing and product details.</ItemDescription>
                  </div>
                </ItemHeader>
              </Item>
            </ItemCard>
          </section>
        </div>
      </Center>
    </div>
  );
}
