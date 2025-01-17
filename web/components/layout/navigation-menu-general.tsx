// @ts-nocheck
'use client'

import * as React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/shared/ui/navigation-menu'
import { turboIntegrations } from '@/data/turbo-integrations'
import { cn } from '@/lib/utils'

import { BranchColorMode } from '../shared/branch-color-mode'
import { LinkComponent } from '../shared/link-component'

export function NavigationMenuGeneral() {
  return (
    <NavigationMenu className="self-center">
      <NavigationMenuList className="w-full">
        {/* <NavigationMenuItem>
          <LinkComponent href="/minthypercert">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Mint A Bounty Hypercert</NavigationMenuLink>
          </LinkComponent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LinkComponent href="/certificates">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>My Bounty Hypercerts</NavigationMenuLink>
          </LinkComponent>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, name, imgLight, imgDark, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700',
              className
            )}
            {...props}>
            {/* <img src={image} className="mb-3 h-7 w-7 rounded-full" alt="partner logo" /> */}
            <BranchColorMode>
              <Image className="mb-3 h-7 w-7 rounded-full" alt="Etherscan logo" src={imgDark} width={100} height={100} />
              <Image className="mb-3 h-7 w-7 rounded-full" alt="Etherscan logo" src={imgLight} width={100} height={100} />
            </BranchColorMode>
            <div className="text-sm font-medium leading-none">{name}</div>
            <p className="text-sm leading-snug text-slate-500 line-clamp-2 dark:text-slate-400">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
