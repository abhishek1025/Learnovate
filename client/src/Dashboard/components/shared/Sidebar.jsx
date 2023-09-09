import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { DASHBOARD_SIDEBAR_LINKS } from "../../lib";
import { v4 as uuidv4 } from 'uuid';


export function MultiLevelSidebar() {

    return (
        <Card className="w-full max-w-[20rem] p-4 shadow-none border-r">
            <Link to="/">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        Learnoavte
                    </Typography>
                </div>
            </Link>
            <List>

                {
                    DASHBOARD_SIDEBAR_LINKS.admin.map((sidebarLink) => {
                        const { key, label, path, icon, subMenu } = sidebarLink;

                        if (subMenu) {
                            return (
                                <SidebarAccordion
                                    key={uuidv4()}
                                    menuData={sidebarLink}
                                />
                            )
                        }

                        return (
                            <Link to={path} key={key}>
                                <ListItem>
                                    <ListItemPrefix>
                                        {icon}
                                    </ListItemPrefix>
                                    {label}
                                </ListItem>
                            </Link>
                        )
                    })
                }

                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}

const SidebarAccordion = ({ menuData }) => {

    const { label, icon, subMenu } = menuData;

    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Accordion
            open={open === 1}
            icon={
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
            }
        >
            <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                    <ListItemPrefix>
                        {/* <PresentationChartBarIcon className="h-5 w-5" />
                         */}
                        {icon}
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                        {label}
                    </Typography>
                </AccordionHeader>
            </ListItem>

            <AccordionBody className="py-1">
                <List className="p-0">
                    {
                        subMenu.map((subMenuItem) => (
                            <Link to={subMenuItem.path} key={uuidv4()} >
                                <ListItem className="pl-3">
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    {subMenuItem.label}
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
            </AccordionBody>

        </Accordion>
    )
}