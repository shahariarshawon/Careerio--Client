import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto bg-white rounded-2xl shadow-xl p-4"
    >
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 text-sm">
          A list of your recently registered companies
        </TableCaption>

        <TableHeader className="bg-[#6A38C2]/10 rounded-lg">
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <AnimatePresence>
            {filterCompany?.map((company, idx) => (
              <motion.tr
                key={company._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="hover:bg-[#6A38C2]/5 transition-colors rounded-lg"
              >
                <TableCell>
                  <Avatar className="ring-1 ring-[#6A38C2]/40 hover:scale-105 transition-transform">
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-gray-700">
                  {company.name}
                </TableCell>
                <TableCell className="text-gray-500">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-2"
                      >
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:text-[#6A38C2] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </motion.div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default CompaniesTable;
