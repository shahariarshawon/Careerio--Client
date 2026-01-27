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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4"
    >
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 text-sm">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader className="bg-[#6A38C2]/10 rounded-lg">
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <AnimatePresence>
            {filterJobs?.map((job, idx) => (
              <motion.tr
                key={job._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="hover:bg-[#6A38C2]/5 transition-colors rounded-lg"
              >
                <TableCell className="font-medium text-gray-700">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="text-gray-600">{job?.title}</TableCell>
                <TableCell className="text-gray-500">
                  {job?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36">
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-2"
                      >
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${job._id}`)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:text-[#6A38C2] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:text-[#6A38C2] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Applicants</span>
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

export default AdminJobsTable;
