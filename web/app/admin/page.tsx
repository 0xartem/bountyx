'use client'

import { motion } from 'framer-motion'

import AppUsersTable from '@/components/app/app-users-table'
import MenuAdminSidebar from '@/components/layout/dashboard/menu-admin-sidebar'
import ButtonSIWELogout from '@/components/siwe/button-siwe-logout'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PageAdmin() {
  return (
    <>
      <div className="flex-center container mx-auto flex flex-1 flex-col items-center justify-center">
        <motion.div
          className="grid w-full flex-1 grid-cols-12 gap-x-10"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}>
          <div className="bg-gradient-primary col-span-12 flex w-full flex-col rounded-lg p-6 shadow-lg lg:col-span-3">
            <h3 className="text-gradient-primary text-2xl font-bold">Admin Area</h3>
            <hr className="my-5 dark:border-gray-200 dark:opacity-50" />
            <MenuAdminSidebar className="h-full flex-1" />
            <div className="">
              <hr className="my-5 dark:border-gray-200 dark:opacity-50" />
              <ButtonSIWELogout className="link">Logout</ButtonSIWELogout>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
